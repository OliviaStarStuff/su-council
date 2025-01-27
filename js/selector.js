"use strict";

import { records, generateCouncillors } from "./councilMap.js";
import { generateGroupings } from "./groupings.js";
import { setCouncillorClickBehaviour } from "./panel.js";
import { updateSummary } from "./summary.js";

const notloaded = document.createElement("p");
notloaded.innerText = "not loaded";
notloaded.innerText = records["2024/2025"].map( r =>   r.name);
document.getElementById("summary").appendChild(notloaded);


const yearSelector = document.getElementById("year-select");
// Set up selector with all voting options
const policySelector = document.getElementById("policy-select");

function generatePolicyOptions(period) {
    let sessionIndex = 0;
    let optGroup;
    for(var i = 0; i<records[period].length; i++) {

        if(records[period][i].session > sessionIndex) {
            sessionIndex = records[period][i].session;
            optGroup = document.createElement('optgroup');
            optGroup.label = "Session " + sessionIndex;
            policySelector.append(optGroup);
        }

        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = records[period][i].name;
        optGroup.append(opt);
    }
}

try {
    generatePolicyOptions(yearSelector.value);
  } catch (error) {
    console.error(error);
    notloaded.innerText = error;
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
  }

const policyName = document.getElementById("policy-name")
policySelector.addEventListener("change", (e) => {
    // If no policy is selected, clear vote classes
    const councillors = Councillor.list;
    if(e.target.value == "none") {
        console.log("we got here");
        policyName.innerText = "";
        for(const c of councillors) {
            c.vote = -1;
            // c.clearVoteClasses();
        }
    } else {
        policyName.innerText = records[yearSelector.value][e.target.value].name;
        for(const c of councillors) {
            // c.classList.toggle("vacant", c.isCurrentlyVacant)
            c.vote = e.target.value;
        }
    }
    updateSummary(e);
});

policySelector.focus();

yearSelector.addEventListener("change", (e) => {

    Councillor.list = []
    // refresh the board
    clearChildren("council-map");
    generateCouncillors(yearSelector.value);
    //
    // refresh the grid
    clearChildren("grids");
    generateGroupings();

    // refresh the policy selector
    clearChildren("policy-select");
    let opt = document.createElement('option');
    opt.value = "none";
    opt.innerText = "None";
    policySelector.append(opt);
    generatePolicyOptions(yearSelector.value);
    setCouncillorClickBehaviour();
    policySelector.dispatchEvent(new Event('change'))
    policyName.innerText = "";
})

console.log("Selector Loaded");
notloaded.classList.add("display-hidden");
