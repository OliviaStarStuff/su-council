"use strict";

import { records }  from './councilMap.js';

// Summary Window draggable feature
// const summary = document.getElementById("summary");

// let drag = false;
// const rect = summary.getBoundingClientRect();
// const pos = {"x": rect.left, "y": rect.top};
// const offsetPos = {"x": 0, "y": 0};
// summary.addEventListener('pointerdown', (e) => {
//     drag = true
//     offsetPos.x = e.clientX-pos.x;
//     offsetPos.y = e.clientY-pos.y;
// });

// document.addEventListener('pointerup', () => {
//     drag = false;
// });

// document.addEventListener('pointermove', (e) => {
//         if(drag) {
//             pos.x = e.clientX - offsetPos.x;
//             pos.y = e.clientY - offsetPos.y;
//             summary.style.left = pos.x + "px";
//             summary.style.top = pos.y + "px";
//         }
// });


// collapsables
// const policyCollapsable = new Collapsable("policy", true);
const togglesCollapsable = new Collapsable("toggles", true);
const voteSummaryCollapsable = new Collapsable("vote-summary", true);
const voteSummaryPanelCollapsable = new Collapsable("vote-summary-panel", true);

// Produces a row for the voteSummaryNode
function setItem(option, totalValue, voteClass, addMouseOver=true) {
    const item = document.createElement("div");
    const optionText = document.createElement("p");
    optionText.innerText  = option + ": ";

    const total = document.createElement("p");
    total.innerText = totalValue;
    item.appendChild(optionText);
    item.appendChild(total);

    if (voteClass) { item.classList.add(voteClass); }

    if (!addMouseOver) { return item; }
    // Add interactions for mouseover and mouseout to highlight similar votes
    item.addEventListener("mouseover", (e) =>  {
        for (const c of Councillor.list) {
            c.classList.toggle("vote-hidden", !c.classList.contains(voteClass));
        }
    })

    item.addEventListener("mouseout", (e) =>  {
        for (const c of Councillor.list) {
            c.classList.remove("vote-hidden");
        }
    })

    return item;
}
// update vote summary container
const policySelector = document.getElementById("policy-select");

class VoteSummary {
    static #breakdown = {}
    static #targetOptions = [];
    static #style = [];
    static #name = "";
    static #session = "";
    static #recordType = "";
    static #result = "";
    static #total = 0;
    static #absent = 0;
    static #vacant = 0;

    static get breakdown() { return VoteSummary.#breakdown; }
    static get targetOptions() { return VoteSummary.#targetOptions; }
    static get name() { return VoteSummary.#name; }
    static get session() { return VoteSummary.#session; }
    static get result() { return VoteSummary.#result; }
    static get total() { return VoteSummary.#total; }
    static get absent() { return VoteSummary.#absent; }
    static get vacant() { return VoteSummary.#vacant; }
    static get style() { return VoteSummary.#style; }
    static get type() { return VoteSummary.#recordType; }
    static get occupiedSeats() { return Councillor.list.length - VoteSummary.#vacant; }
    /* https://docs.google.com/document/d/1yz1t0o724tRYjlT8UlQK5moOQSXoWxgKw75YGB3zIMc/edit?tab=t.0
    Quoracy is the number of SU council members that must be present in
    order for the meeting to happen and make valid decisions.
    The threshold set for quoracy is 2/3rds of SU Council members,
    excluding positions that are vacant.
    Programmers note: This appears to be rounded up.
    E.g. 60 Councillors means 44 councillor quorum */
    static get quorum() { return Math.ceil(this.occupiedSeats * 2/3); }
    static get threshold() {
        return Math.ceil(
                VoteSummary.adjustedTotal
                * (VoteSummary.isSuperMajority(VoteSummary.#recordType) ? 2/3 : 1/2));
    }

    static set breakdown(record) {
        VoteSummary.#breakdown = {};
        VoteSummary.#targetOptions = Vote.styles[record.style];
        VoteSummary.#name = record.name;
        VoteSummary.#session = record.session;
        VoteSummary.#result = record.result;
        VoteSummary.#style = record.style;
        VoteSummary.#absent = 0;
        VoteSummary.#vacant = 0;
        VoteSummary.#total = VoteSummary.getTotalVotes(record.votes);
        VoteSummary.#recordType = record.type;

        for (let i = 0; i< Councillor.list.length; i++) {
            if(Councillor.list[i].isCurrentlyVacant || record.votes[i] == "")
            {
                VoteSummary.#vacant++;
            }
        }

        for (const option of (VoteSummary.#targetOptions)) {
            let total = 0;

            if (option == "No Vote") {
                for (const c of Councillor.list) {
                    if (c.vote == "Absent") {
                        total += 1;
                        VoteSummary.#absent +=1;
                    }
                }

            } else {
                total = record.votes.filter(x => x == option).length;
            }

            const chosenOption = option == "No Vote" ? "Absent" : option;

            VoteSummary.#breakdown[chosenOption] = total;
        }
    }

    static getTotalVotes(votes) {
        return votes.filter(x => x != "No Vote" && x != "blank" && x != "" && x != "Absent").length
    }

    static get quota() {
        return Math.ceil(VoteSummary.adjustedTotal / (1 + 1) + 1);
    }

    static get adjustedTotal() {
        let totalVotes = VoteSummary.#total;
        // this check is not ideal, we need a check that says
        // after 2023/2024 instead of this
        if(getCurrentYear() != "2024/2025") {
            totalVotes -= VoteSummary.#breakdown.Abstain;
        }
        return totalVotes;
    }

    static isPassed() {
        if (VoteSummary.style == "standard")
            return VoteSummary.#breakdown.For > VoteSummary.threshold;
        else {
            for (const value of Object.values(VoteSummary.#breakdown))
            return value > VoteSummary.quota;
        }
    }

    static isSuperMajority(recordType=VoteSummary.#recordType) {
        switch(recordType) {
            case "policy proposal":
            case "bye-law amendment":
            case "censure":
            case "vonc chair":
            case "vonc officer":
            case "overturn committee":
            case "mandate":
            case "challenge chair":
                return true;
                break;
            default:
                return false;
        }
    }
}

function updateSummary(e, voteSummaryID) {
    const voteSummaryNode = document.getElementById(voteSummaryID);
    const voteSummaryContainer = document.getElementById(voteSummaryID + "-container");
    const policyTitle = voteSummaryNode.querySelector("h3");
    const councilSession = voteSummaryNode.querySelector("h4");
    // clear summary list
    clearChildren(voteSummaryID + "-container");

    // guard clause if not showing voting data, show nothing
    // voteSummaryTabContainer.classList.toggle("display-hidden", e.target.value == "none");
    if (e.target.value == "none") { return; }

    // Get the correct record and options
    const record = records[getCurrentYear()].policies[e.target.value];

    VoteSummary.breakdown = record;

    policyTitle.innerText = record.name;
    councilSession.innerText = `Session ${record.session} - ${VoteSummary.type}`;

    /* Display Code */
    // Row 1: Result
    let actualResult = VoteSummary.result;
    if (!VoteSummary.isPassed() && actualResult == "Passed") {
        console.log(actualResult, actualResult, VoteSummary.threshold)
        actualResult = "Passed but shouldn't have";
    }

    let item = setItem("Result", actualResult, undefined, false);
    item.classList.add("summary-top");
    voteSummaryContainer.appendChild(item);

    // Row 2: councillors + Total votes
    item = setItem("Councillors", VoteSummary.occupiedSeats, undefined, false);
    item.classList.add("summary-top");
    item.addEventListener("mouseover", (e) =>  {
        for (const c of Councillor.list) {
            c.classList.toggle("vote-hidden", c.isCurrentlyVacant);
        }
    })

    item.addEventListener("mouseout", (e) =>  {
        for (const c of Councillor.list) {
            c.classList.remove("vote-hidden");
        }
    })

    voteSummaryContainer.appendChild(item);

    item = setItem("Total Votes", VoteSummary.total, undefined, false);
    item.classList.add("summary-top");
    item.addEventListener("mouseover", (e) =>  {
        for (const c of Councillor.list) {
            c.classList.toggle("vote-hidden", c.isCurrentlyVacant || c.vote == "Absent");
        }
    })

    item.addEventListener("mouseout", (e) =>  {
        for (const c of Councillor.list) {
            c.classList.remove("vote-hidden");
        }
    })
    voteSummaryContainer.appendChild(item);

    // Row 3: vacant + quota
    // Last Row: Total vacant seats
    let vacantTotal = 0;
    for (let i = 0; i< Councillor.list.length; i++) {
        if(Councillor.list[i].isCurrentlyVacant || record.votes[i] == "") { vacantTotal++; }
    }
    const itemVacant = setItem("Vacant", vacantTotal, "vote-vacant");
    itemVacant.classList.add("summary-top");
    item.before(itemVacant);

    if(VoteSummary.style == "standard") {
        const recordType = VoteSummary.isSuperMajority() ? "Super Majority" : "Simple Majority";
        item = setItem(recordType, VoteSummary.threshold, undefined, false);
    } else {
        item = setItem("Quota", VoteSummary.quota, undefined, false);
    }
    item.classList.add("summary-top");
    voteSummaryContainer.appendChild(item);

    // number of votes for each option

    for (const option of (VoteSummary.targetOptions)) {
        const voteClass = Vote.getClass(option, record.style);
        const chosenOption = option == "No Vote" ? "Absent" : option;
        const item = setItem(chosenOption, VoteSummary.breakdown[chosenOption], voteClass);
        item.classList.add("fa-solid");
        voteSummaryContainer.appendChild(item);
    }

}

function addSummaryBackButtonListner() {
    const policyList = document.getElementById("policy-list")
    const voteSummary = document.getElementById("vote-summary");
    const backButton = voteSummary.querySelector("button");

    backButton.addEventListener("click", e => {
        voteSummary.classList.add("display-hidden");
        policyList.classList.remove("display-hidden");
    })
    const helpDefinitions = document.getElementById("summary-definitions-template")
    for (const root of ["vote-summary", "vote-summary-panel"]) {
        const rootNode = document.getElementById(root)
        const helpOverlay = rootNode.querySelector(`#${root}-help-overlay`);
        const helpButton = rootNode.querySelector(`#${root}-help-button`);
        helpButton.addEventListener("click", e => {
            helpOverlay.classList.remove("display-hidden");
        })

        helpOverlay.addEventListener("click", e => {
            helpOverlay.classList.add("display-hidden");
        })
        helpOverlay.append(helpDefinitions.content.cloneNode(true))
    }
}

createMessage("summary loaded");
export { updateSummary, addSummaryBackButtonListner, VoteSummary }
