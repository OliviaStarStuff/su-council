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

// Produces a row for the votesummary
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

function updateSummary(e, voteSummaryID) {
    const voteSummary = document.getElementById(voteSummaryID);
    const voteSummaryContainer = document.getElementById(voteSummaryID + "-container");
    const policyTitle = voteSummary.querySelector("h3");
    const councilSession = voteSummary.querySelector("h4");
    console.log(voteSummaryID, voteSummaryContainer);
    // clear summary list
    clearChildren(voteSummaryID + "-container");

    // guard clause if not showing voting data, show nothing
    // voteSummaryTabContainer.classList.toggle("display-hidden", e.target.value == "none");
    if (e.target.value == "none") { return; }

    // Get the correct record and options
    const record = records[getCurrentYear()].policies[e.target.value];
    const targetOptions = Vote.styles[record.style];

    policyTitle.innerText = record.name;
    councilSession.innerText = `Session ${record.session}`;

    /* Display Code */
    // Row 1: Result
    let item = setItem("Result", record.result, undefined, false);
    item.classList.add("summary-top");
    voteSummaryContainer.appendChild(item);

    // Row 2: Total votes
    const topTotal = record.votes.filter(x => x != "No Vote" && x != "blank" && x != "" && x != "Absent").length;
    item = setItem("Total Votes", topTotal, undefined, false);
    item.classList.add("summary-top");
    voteSummaryContainer.appendChild(item);

    let forVotes = 0;
    let abstainVotes = 0;
    // Row 3.. number of votes for each option
    for (const option of (targetOptions)) {
        let total = 0;
        // this sketchy work around is done because there are some
        // non vacant positions that have a vote entry
        // as "" instead of "No Vote". what does that mean?
        /* going to assume the seat was vacant but is no longer */
        if (option == "No Vote") {
            for (const c of Councillor.list) {
                if (c.vote == "Absent") {
                    total += 1;
                }
            }
        } else {
            total = record.votes.filter(x => x == option).length;
        }
        if (option == "For") { forVotes = total; }
        if (option == "Abstain") { abstainVotes = total; }

        const voteClass = Vote.getClass(option, record.style);
        const chosenOption = option == "No Vote" ? "Absent" : option;
        const item = setItem(chosenOption, total, voteClass);
        voteSummaryContainer.appendChild(item);
    }

    const threshold = Math.ceil((topTotal - abstainVotes) * 2 / 3);
    console.log(forVotes + " out of " + (topTotal - abstainVotes) + " votes. Threshold is " + threshold);
    console.log("Vote " + (forVotes > threshold ? "passes" : "fails"));

    // Last Row: Total vacant seats
    let vacantTotal = 0;
    for (let i = 0; i< Councillor.list.length; i++) {
        if(Councillor.list[i].isCurrentlyVacant || record.votes[i] == "") { vacantTotal++; }
    }
    item = setItem("Vacant", vacantTotal, "vote-vacant");
    // item.classList.add(vote);
    voteSummaryContainer.appendChild(item);
}

const policyList = document.getElementById("policy-list")
const voteSummary = document.getElementById("vote-summary");
const backButton = voteSummary.querySelector("button");

function addSummaryBackButtonListner() {
    backButton.addEventListener("click", e => {
        voteSummary.classList.add("display-hidden");
        policyList.classList.remove("display-hidden");
    })
}

createMessage("summary loaded");
export { updateSummary, addSummaryBackButtonListner }
