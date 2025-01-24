const button = document.getElementById("panel-close-button");
const panel = document.getElementById("councillor-panel");

const panelTitle = document.getElementById("panel-title");
const recordTable = document.getElementById("record-table");
const vacantContainer = document.getElementById("panel-vacant-container");
const gridMain = document.getElementById("panel-bottom-container");

import { records } from "./councilMap.js"
for(const councillor of Councillor.list) {
    councillor.node.addEventListener("click", (e) => {
        // open panel;
        isExpanded = true;
        closeIndicator.innerText = "chevron_right";
        panel.classList.add("panel-open");
        gridMain.classList.remove("display-hidden");

        // Set panel stylings
        updatePanel(councillor);

        // clear vote history table;
        while(recordTable.firstChild) {
            recordTable.removeChild(recordTable.firstChild);
        }

        // populate vote history table;
        for(const r of councillor.history) {
            if (councillor.isVacant || r.vote == "") { continue; }
            createHistoryRow(r);
        }

        vacantContainer.classList.toggle("display-hidden", !councillor.isVacant)
    })
}

function updatePanel(councillor) {
    panelTitle.className = '';
    button.className = '';
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

    recordTable.appendChild(voteRow);
}

// contractable vote history tab
const voteHistoryCollapsable = new Collapsable("vote-history", true);

const manifestoCollapsable = new Collapsable("manifesto", false);


const closeIndicator = document.getElementById("panel-close-button-indicator");
let isExpanded = false;
// close panel
button.addEventListener("click", (e) => {
    isExpanded = !isExpanded
    panel.classList.toggle("panel-open");
    gridMain.classList.toggle("display-hidden");
    closeIndicator.innerText = isExpanded ?  "chevron_right" : "chevron_left";
})

for(const c of Councillor.list) {
    if(c.title == "SU President") {
        c.node.click();
        closeIndicator.click();
        break;
    }
}

console.log("Panel Loaded");
