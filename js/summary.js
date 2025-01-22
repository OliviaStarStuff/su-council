"use strict";

import { councillors, records }  from './councilMap.js';

// Summary Window draggable feature
const summary = document.getElementById("summary");

let drag = false;
const pos = {"x": 0, "y": 0};
const offsetPos = {"x": 0, "y": 0};
summary.addEventListener('pointerdown', (e) => {
    drag = true
    offsetPos.x = e.clientX-pos.x;
    offsetPos.y = e.clientY-pos.y;
});

document.addEventListener('pointerup', () => {
    drag = false;
});

document.addEventListener('pointermove', (e) => {
        if(drag) {
            pos.x = e.clientX - offsetPos.x;
            pos.y = e.clientY - offsetPos.y;
            summary.style.left = pos.x + "px";
            summary.style.top = pos.y + "px";
        }
});


// collapsables
const togglesHeaderCollapsable = new Collapsable("toggles", false);
const voteSummaryCollapsable = new Collapsable("vote-summary", true);

// Produces a row for the votesummary
function setItem(option, totalValue, voteClass) {
    const item = document.createElement("div");
    const optionText = document.createElement("p");
    optionText.innerText  = option + ": ";

    const total = document.createElement("p");
    total.innerText = totalValue;
    item.appendChild(optionText);
    item.appendChild(total);

    if (voteClass) { item.classList.add(voteClass); }


    // Add interactions for mouseover and mouseout to highlight similar votes
    item.addEventListener("mouseover", (e) =>  {
        for (const c of councillors) {
            c.classList.toggle("vote-hidden", !c.classList.contains(voteClass));
        }
    })

    item.addEventListener("mouseout", (e) =>  {
        for (const c of councillors) {
            c.classList.remove("vote-hidden");
        }
    })

    return item;
}

// update vote summary container
const policySelector = document.getElementById("policy");
const voteSummaryContainer = document.getElementById("vote-summary-container");
const voteSummary = document.getElementById("vote-summary");

policySelector.addEventListener("change", (e) => {
    // clear summary list
    while (voteSummaryContainer.firstChild) {
        voteSummaryContainer.removeChild(voteSummaryContainer.firstChild);
    }

    // guard clause if not showing voting data, show nothing
    voteSummary.classList.toggle("hidden", e.target.value == "none");
    if (e.target.value == "none") { return; }

    // Get the correct record and options
    const record = records[e.target.value];
    const targetOptions = Vote.styles[record.style];

    /* Display Code */
    // Row 1: Result
    let item = setItem("Result", record.result);
    voteSummaryContainer.appendChild(item);

    // Row 2: Total votes
    const topTotal = record.votes.filter(x => x != "No Vote" && x != "blank" && x != "").length;
    item = setItem("Total Votes", topTotal);
    voteSummaryContainer.appendChild(item);

    // Row 3.. number of votes for each option
    for (const option of (targetOptions)) {
        let total = 0;
        // this sketchy work around is done because there are some
        // non vacant positions that have a vote entry
        // as "" instead of "No Vote". what does that mean?
        /* going to assume the seat was vacant but is no longer */
        if (option == "No Vote") {
            for (const c of councillors) {
                if (c.vote == "Absent") {
                    total += 1;
                }
            }
        } else {
            total = record.votes.filter(x => x == option).length;
        }

        const voteClass = Vote.getClass(option, record.style);
        const chosenOption = option == "No Vote" ? "Absent" : option;
        const item = setItem(chosenOption, total, voteClass);
        voteSummaryContainer.appendChild(item);
    }

    // Last Row: Total vacant seats
    let vacantTotal = 0;
    for (let i = 0; i< councillors.length; i++) {
        if(councillors[i].isVacant || record.votes[i] == "") { vacantTotal++; }
    }
    item = setItem("Vacant", vacantTotal, "vote-vacant");
    // item.classList.add(vote);
    voteSummaryContainer.appendChild(item);

})

// Update links
const outlink = document.getElementById("outlink");
const policyContainer = document.getElementById("policy-description-container");
policySelector.addEventListener("change", (e) => {
    policyContainer.classList.toggle("hidden", e.target.value == "none");
    if(e.target.value != "none") {
        const url = records[e.target.value].url;
        outlink.href = url == "" ? "/#" : url;
    }
});
