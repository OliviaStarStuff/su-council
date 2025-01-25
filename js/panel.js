const button = document.getElementById("cllr-panel-close-button");
const panel = document.getElementById("cllr-panel");
const details = document.getElementById("cllr-panel-details-container");
const closeIndicator = document.getElementById("cllr-panel-close-button-indicator");
const closeIndicatorH = document.getElementById("cllr-panel-close-button-indicator-h");

let isExpanded = false;
// close panel
button.addEventListener("click", (e) => {
    isExpanded = !isExpanded
    panel.classList.toggle("panel-open");
    details.classList.toggle("display-hidden");
    closeIndicator.innerText = isExpanded ?  "keyboard_arrow_down" : "keyboard_arrow_up";
    closeIndicatorH.innerText = isExpanded ?  "chevron_right" : "chevron_left";
})

// fill details
const panelTitle = document.getElementById("cllr-panel-title");
const recordTableBody = document.getElementById("cllr-record-body");
const vacantContainer = document.getElementById("cllr-panel-vacant-container");

import { records } from "./councilMap.js"
export function setCouncillorClickBehaviour() {
    for(const councillor of Councillor.list) {
        councillor.node.addEventListener("click", (e) => {
            // open panel;
            isExpanded = true;
            closeIndicator.innerText = "keyboard_arrow_down";
            closeIndicatorH.innerText = "keyboard_arrow_right";
            panel.classList.add("panel-open");
            details.classList.remove("display-hidden");

            // Set panel stylings
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
            // vacantContainer.classList.toggle("display-hidden", !councillor.isVacant)
        })
    }

    for(const c of Councillor.list) {
        if(c.title == "SU President") {
            c.node.click();
            closeIndicator.click();
            break;
        }
    }
}

setCouncillorClickBehaviour();

function updatePanel(councillor) {
    // const classes = ["member-fto","member-pto","member-academic","member-fto"]
    panelTitle.className = '';
    button.className = "";
    panelTitle.classList.add("panel-title");
    button.classList.add("panel-close-button");
    button.classList.add(councillor.colourClass);
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

// contractable vote history tab
const voteHistoryCollapsable = new Collapsable("vote-history", true);

const manifestoCollapsable = new Collapsable("manifesto", false);

console.log("Panel Loaded");
