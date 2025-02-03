"use strict";

import { records, generateCouncillors } from "./councilMap.js";
import { generateGroupings } from "./groupings.js";
import { populateCouncillorList } from "./councillorList.js";
import { setCouncillorClickBehaviour } from "./panel.js";
import { updateSummary } from "./summary.js";

const notloaded = document.createElement("p");
notloaded.innerText = "not loaded";
notloaded.innerText = records["2024/2025"].policies.map( r =>   r.name);
// document.getElementById("summary").appendChild(notloaded);


const yearSelector = document.getElementById("year-buttons");
// Set up selector with all voting options
const policyList = document.getElementById("policy-list");
const panelPolicySelector = document.getElementById("panel-policy-select");
const policySelector = document.getElementById("policy-select");

function generatePolicyListOptions(period) {
    const itemTemplate = document.getElementById("list-item-template");
    const headerTemplate = document.getElementById("list-header-template");

    let sessionIndex = 0;

    for(var i = 0; i<records[period].policies.length; i++) {
        const record = records[period].policies[i];

        if(record.session > sessionIndex) {
            sessionIndex = record.session;
            const header = headerTemplate.content.cloneNode(true);
            header.querySelector("h5").innerText = "Session " + sessionIndex;
            policyList.appendChild(header);
        }

        const clone = itemTemplate.content.cloneNode(true);

        clone.querySelector("p").innerText = record.name;

        const displayPolicyButton = clone.querySelector("button");
        displayPolicyButton.value = i;
        displayPolicyButton.addEventListener("click", e => {selectPolicy(e, "vote-summary")});

        const summaryButton = clone.querySelector("button.summary-button");
        summaryButton.value = i;
        summaryButton.addEventListener("click", displaySummary);

        const outlink = clone.querySelector("a");
        outlink.disabled = record.url == "";
        outlink.href = record.url;

        policyList.appendChild(clone);
    }
}

function generatePolicySelectOptions(pSelector, period) {
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
    generatePolicyListOptions(getCurrentYear());
    generatePolicySelectOptions(policySelector, getCurrentYear());
  } catch (error) {
    console.error(error);
    notloaded.innerText = error;
    // Expected output: ReferenceError: nonExistentFunction is not defined
    // (Note: the exact output may be browser-dependent)
}
function selectPolicy(e, summaryId) {
    // If no policy is selected, clear vote classes
    const councillors = Councillor.list;
    if(e.target.value == "none") {
        for(const c of councillors) { c.vote = -1; }
    } else {
        for(const c of councillors) { c.vote = e.target.value; }
    }
    updateSummary(e, summaryId);
    policyList.value = e.target.value;
}

const voteSummary = document.getElementById("vote-summary")
function displaySummary(e) {
    selectPolicy(e, "vote-summary");
    policyList.classList.add("display-hidden");
    voteSummary.classList.remove("display-hidden");
}

const policyName = document.getElementById("policy-name")
policySelector.addEventListener("change", (e) => {selectPolicy(e, "vote-summary-panel")})

policyList.focus();

populateCouncillorList();

setCouncillorClickBehaviour();
function selectYear(e) {
    Councillor.list = []
    // refresh the board
    clearChildren("council-container");
    generateCouncillors(e.target.value);

    populateCouncillorList();
    //
    // refresh the grid
    clearChildren("grids");
    generateGroupings();

    // refresh the policy selector
    clearChildren(policyList.id);
    generatePolicyListOptions(e.target.value);

    clearChildren(policySelector.id);
    generatePolicySelectOptions(policySelector, e.target.value);

    setCouncillorClickBehaviour();
    // policyList.dispatchEvent(new Event('change'))
}

const tab = document.getElementById("session-tab");
for (const button of yearSelector.children) {
    if (!button.disabled) {
        button.addEventListener("click", (e) => {
            for (const otherButton of yearSelector.children) {
                otherButton.classList.toggle("selected", otherButton == button)
                tab.scrollTop = 0;
            }
            selectYear(e);
        })
    }
}

export function resetVotesList() {
    policyList.classList.remove("display-hidden");
    voteSummary.classList.add("display-hidden");
}
console.log("Selector Loaded");
notloaded.classList.add("display-hidden");
