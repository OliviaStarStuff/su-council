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

function generatePolicyOptions(period) {
    let sessionIndex = 0;
    for(var i = 0; i<records[period].length; i++) {

        if(records[period][i].session > sessionIndex) {
            let opt = document.createElement('option');
            opt.value = "none";
            sessionIndex = records[period][i].session;
            opt.innerText = "---Session " + sessionIndex;
            policySelector.append(opt);
        }

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
    } else {
        for(const c of councillors) {
            if(c.vacantList) {
                console.log(c.vacantList);
                c.node.classList.remove("vacant");
                for(const i of c.vacantList) {
                    if (e.target.value == i) {
                        c.node.classList.add("vacant");
                    }
                }
            }
            c.vote = e.target.value;
            // if(!c.isVacant) { c.vote = e.target.value;}
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
    policySelector.dispatchEvent(new Event('change'))
})

console.log("Selector Loaded");
notloaded.classList.add("display-hidden");
