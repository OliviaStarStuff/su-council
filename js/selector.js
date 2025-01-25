"use strict";

import { records, generateCouncillors } from "./councilMap.js";
import { generateGroupings } from "./groupings.js";
import { setCouncillorClickBehaviour } from "./panel.js";

const notloaded = document.createElement("p");
notloaded.innerText = "not loaded";
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

generatePolicyOptions(yearSelector.value);

policySelector.addEventListener("change", (e) => {
    // If no policy is selected, clear vote classes
    const councillors = Councillor.list;
    if(e.target.value == "none") {
        for(const c of councillors) {
            c.classList.toggle("vacant", c.isVacant)
            c.clearVoteClasses();
        }
    } else {
        for(const c of councillors) {
            c.vote = e.target.value;
        }
    }
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
})

console.log("Selector Loaded");
notloaded.classList.add("display-hidden");
