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
const togglesCollapsable = new Collapsable("toggles", false);
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
    static #name = "";
    static #session = "";
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


    static set breakdown(record) {
        VoteSummary.#breakdown = {};
        VoteSummary.#targetOptions = Vote.styles[record.style];
        VoteSummary.#name = record.name;
        VoteSummary.#session = record.session;
        VoteSummary.#result = record.result;
        VoteSummary.#absent = 0;
        VoteSummary.#vacant = 0;
        VoteSummary.#total = VoteSummary.getTotalVotes(record.votes);

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

            console.log(chosenOption);
            VoteSummary.#breakdown[chosenOption] = total;
            console.log(VoteSummary.#breakdown[chosenOption])
        }
    }

    static getTotalVotes(votes) {
        return votes.filter(x => x != "No Vote" && x != "blank" && x != "" && x != "Absent").length
    }

    static getThreshold() {
        return Math.ceil((VoteSummary.#total - VoteSummary.#breakdown.abstain) * 2 / 3)
    }

    static getOldThreshold() {
        return Math.ceil(VoteSummary.#total * 2 / 3)
    }

    static isPassed() {
        // this condition could be better
        if(getCurrentYear() == "2024/2025") {
            return VoteSummary.#breakdown.for > VoteSummary.getThreshold();
        }
        else {
            return VoteSummary.#breakdown.for > VoteSummary.getOldThreshold();
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
    councilSession.innerText = `Session ${record.session}`;

    /* Display Code */
    // Row 1: Result
    let item = setItem("Result", VoteSummary.result, undefined, false);
    item.classList.add("summary-top");
    voteSummaryContainer.appendChild(item);

    // Row 2: Total votes
    item = setItem("Total Votes", VoteSummary.total, undefined, false);
    item.classList.add("summary-top");
    voteSummaryContainer.appendChild(item);

    // Row 3.. number of votes for each option
    console.log(VoteSummary.targetOptions);

    for (const option of (VoteSummary.targetOptions)) {
        const voteClass = Vote.getClass(option, record.style);
        const chosenOption = option == "No Vote" ? "Absent" : option;
        const item = setItem(chosenOption, VoteSummary.breakdown[chosenOption], voteClass);
        voteSummaryContainer.appendChild(item);
    }

    console.log(VoteSummary["For"] + " out of " + (VoteSummary.total - VoteSummary["Abstain"]) + " votes. Threshold is " + VoteSummary.getThreshold());
    console.log("Vote " + (VoteSummary.isPassed() ? "passes" : "fails"));

    // Last Row: Total vacant seats
    let vacantTotal = 0;
    for (let i = 0; i< Councillor.list.length; i++) {
        if(Councillor.list[i].isCurrentlyVacant || record.votes[i] == "") { vacantTotal++; }
    }
    item = setItem("Vacant", vacantTotal, "vote-vacant");
    // item.classList.add(vote);
    voteSummaryContainer.appendChild(item);
}

function addSummaryBackButtonListner() {
    const policyList = document.getElementById("policy-list")
    const voteSummary = document.getElementById("vote-summary");
    const backButton = voteSummary.querySelector("button");

    backButton.addEventListener("click", e => {
        voteSummary.classList.add("display-hidden");
        policyList.classList.remove("display-hidden");
    })
}

createMessage("summary loaded");
export { updateSummary, addSummaryBackButtonListner, VoteSummary }
