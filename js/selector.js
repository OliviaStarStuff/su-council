"use strict";

import { records, generateCouncillors } from "./councilMap.js";
import { generateGroupings } from "./groupings.js";
import { setCouncillorClickBehaviour } from "./panel.js";
import { updateSummary } from "./summary.js";

const notloaded = document.createElement("p");
notloaded.innerText = "not loaded";
notloaded.innerText = records["2024/2025"].policies.map( r =>   r.name);
document.getElementById("summary").appendChild(notloaded);


const yearSelector = document.getElementById("year-select");
// Set up selector with all voting options
const policySelector = document.getElementById("policy-select");
const panelPolicySelector = document.getElementById("panel-policy-select");

function generatePolicyOptions(period, pSelector) {
    let sessionIndex = 0;
    let optGroup;
    for(var i = 0; i<records[period].policies.length; i++) {
        const record = records[period].policies[i];
        if(record.session > sessionIndex) {
            sessionIndex = record.session;
            optGroup = document.createElement('optgroup');
            optGroup.label = "Session " + sessionIndex;
            pSelector.append(optGroup);
        }

        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = record.name;
        optGroup.append(opt);
    }
}

try {
    generatePolicyOptions(yearSelector.value, policySelector);
    generatePolicyOptions(yearSelector.value, panelPolicySelector);
  } catch (error) {
    console.error(error);
    notloaded.innerText = error;
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
  }
function selectPolicy(e) {
    // If no policy is selected, clear vote classes
    const councillors = Councillor.list;
    if(e.target.value == "none") {
        policyName.innerText = "";
        for(const c of councillors) { c.vote = -1; }
    } else {
        policyName.innerText = records[yearSelector.value].policies[e.target.value].name;

        for(const c of councillors) { c.vote = e.target.value; }
    }
    updateSummary(e);
    policySelector.value = e.target.value;
    panelPolicySelector.value = e.target.value;
}

const policyName = document.getElementById("policy-name")
policySelector.addEventListener("change", selectPolicy);
panelPolicySelector.addEventListener("change", selectPolicy);

policySelector.focus();

function selectYear(e, yearSelect) {
    Councillor.list = []
    // refresh the board
    clearChildren("council-map");
    generateCouncillors(yearSelector.value);
    //
    // refresh the grid
    clearChildren("grids");
    generateGroupings();

    // refresh the policy selector
    console.log("We got here");
    refreshPolicySelector(panelPolicySelector, "panel-policy-select", yearSelect)
    refreshPolicySelector(policySelector, "policy-select", yearSelect)
    setCouncillorClickBehaviour();
    policySelector.dispatchEvent(new Event('change'))
    policyName.innerText = "";
}

function refreshPolicySelector(pSelector, id, yearSelector,) {
    clearChildren(id);
    let opt = document.createElement('option');
    opt.value = "none";
    opt.innerText = "None";
    pSelector.append(opt);
    generatePolicyOptions(yearSelector.value, pSelector);
}

yearSelector.addEventListener("change", (e) => {
    selectYear(e, yearSelector)
});

// const panelYearSelector = document.getElementById("panel-year-select");
// panelYearSelector.addEventListener("change", (e) => {
//     selectYear(e, panelYearSelector)
// });

console.log("Selector Loaded");
notloaded.classList.add("display-hidden");
