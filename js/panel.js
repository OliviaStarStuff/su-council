const button = document.getElementById("cllr-panel-close-button");


// fill details
const panelTitle = document.getElementById("cllr-panel-title");
const recordTableBody = document.getElementById("cllr-record-body");
const vacantContainer = document.getElementById("cllr-panel-vacant-container");

import { records } from "./councilMap.js"

const councillorButton = document.getElementById("nav-councillors");
export function setCouncillorClickBehaviour() {
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

export function updateMobilePanel(councillor) {

    updatePanel(councillor);

    // clear vote history table;
    while(recordTableBody.firstChild) {
        recordTableBody.removeChild(recordTableBody.firstChild);
    }

    // populate vote history table;
    for(const r of councillor.history) {
        if (r.vote == "") { continue; }
        createHistoryRow(r);
    }
    vacantContainer.classList.add("display-hidden")
}

function updatePanel(councillor) {
    panelTitle.className = '';
    button.className = "";
    panelTitle.classList.add("panel-title");
    panelTitle.classList.add(councillor.colourClass);
    panelTitle.innerText =  councillor.title;
}

function createHistoryRow(record) {
    const voteTitleCell = document.createElement("td");
    voteTitleCell.innerText = record.name;

    const voteCell = document.createElement("td");
    voteCell.classList.add(Vote.getClass(record.vote, record.style));
    voteCell.innerText = record.vote;

    const voteRow = document.createElement("tr");
    voteRow.appendChild(voteTitleCell);
    voteRow.appendChild(voteCell);

    recordTableBody.appendChild(voteRow);
}

console.log("Panel Loaded");
