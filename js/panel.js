// const button = document.getElementById("cllr-panel-close-button");


// fill details
const panelTitle = document.getElementById("cllr-panel-title");
const recordTableBody = document.getElementById("cllr-record-body");
const vacantContainer = document.getElementById("cllr-panel-vacant-container");

import { records } from "./councilMap.js"

const councillorButton = document.getElementById("nav-councillors");
function setCouncillorClickBehaviour() {
    const details = document.getElementById("cllr-details");
    const councillorListContainer = document.getElementById("councillor-list-container");
    for(const councillor of Councillor.list) {
        councillor.node.addEventListener("click", (e) => {
            updateMobilePanel(councillor);
            councillorButton.click();
            councillorListContainer.classList.add("display-hidden");
            details.classList.remove("display-hidden");
            console.log("councilor clicked!");
        })
    }
}

function updateMobilePanel(councillor) {

    updatePanel(councillor);

    // clear vote history table;
    while(recordTableBody.firstChild) {
        recordTableBody.removeChild(recordTableBody.firstChild);
    }

    // populate vote history table;
    let i = 0
    const currentPolicies = Record.records[getCurrentYear()].policies;
    for(const r of councillor.history) {
        i++;
        if (r.vote == "") { continue; }
        createHistoryRow(r, i, currentPolicies[i-1].url);
    }
    // vacantContainer.classList.add("display-hidden")
}

function updatePanel(councillor) {
    panelTitle.className = '';
    panelTitle.classList.add("panel-title");
    panelTitle.classList.add(councillor.colourClass);
    panelTitle.innerText =  councillor.title;
}

const rowTemplate = document.getElementById("record-table-row-template");
const policySelector = document.getElementById("policy-select");
function createHistoryRow(record, index, url) {
    const clone = rowTemplate.content.cloneNode(true);
    const voteTitleCell = clone.querySelector("a");
    voteTitleCell.innerText = record.name;
    voteTitleCell.href = url;
    voteTitleCell.disabled = url == "";

    const voteCell = clone.querySelector("button");
    voteCell.classList.add(Vote.getClass(record.vote, record.style));
    voteCell.innerText = record.vote;
    voteCell.addEventListener("click", (e) => {
        policySelector.selectedIndex = index;
        policySelector.dispatchEvent(new Event("change"))
    })

    recordTableBody.appendChild(clone);
}

export { setCouncillorClickBehaviour, updateMobilePanel }

console.log("Panel Loaded");
