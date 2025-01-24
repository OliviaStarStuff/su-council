"use strict";

import { records, generateCouncillors } from "./councilMap.js";
import { generateGroupings } from "./groupings.js";
import { setCouncillorClickBehaviour } from "./panel.js";

const notloaded = document.createElement("p");
notloaded.innerText = "not loaded";
document.getElementById("summary").appendChild(notloaded);


const yearSelector = document.getElementById("year-select");
// Set up selector with all voting options
const policySelector = document.getElementById("policy");

for(var i = 0; i<records[yearSelector.value].length; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerText = records[yearSelector.value][i].name;
    policySelector.append(opt);
}

function generatePolicyOptions(period) {
    for(var i = 0; i<records[period].length; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = records[period][i].name;
        policySelector.append(opt);
    }
}

generatePolicyOptions(yearSelector.value);

policySelector.addEventListener("change", (e) => {
    // If no policy is selected, clear vote classes
    const councillors = Councillor.list;
    if(e.target.value == "none") {
        for(let i = 0; i < councillors.length; i++) {
            if(!councillors[i].isVacant) {
                councillors[i].clearVoteClasses();
            }
        }
    // else set vote class
    } else {
        for(const c of councillors) {
            if(!c.isVacant) { c.vote = e.target.value;}
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
    clearChildren("policy");
    let opt = document.createElement('option');
    opt.value = "none";
    opt.innerText = "None";
    policySelector.append(opt);
    generatePolicyOptions(yearSelector.value);
    setCouncillorClickBehaviour();
})

console.log("Selector Loaded");
notloaded.classList.add("display-hidden");
