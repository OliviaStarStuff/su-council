import { councillors, records } from "./councilMap.js";

const button = document.getElementById("panel-close-button");
const panel = document.getElementById("councillor-panel");

const panelTitle = document.getElementById("panel-title");
const recordTable = document.getElementById("record-table");
const vacantContainer = document.getElementById("panel-vacant-container");

for(let i = 0; i < councillors.length; i++) {
        councillors[i].node.addEventListener("click", (e) => {
            // Set bio details
            panelTitle.className = '';
            panelTitle.classList.add(councillors[i].colourClass)
            panelTitle.innerText =  councillors[i].title;

            // clear the vote history table;
            while(recordTable.firstChild) {
                recordTable.removeChild(recordTable.firstChild);
            }

            for(const r of councillors[i].history) {
                if (councillors[i].isVacant || r.vote == "") { continue; }

                const voteTitleCell = document.createElement("td");
                voteTitleCell.innerText = r.name;

                const voteCell = document.createElement("td");
                voteCell.classList.add(Vote.getClass(r.vote, r.style));
                voteCell.innerText = r.vote;

                const voteRow = document.createElement("tr");
                voteRow.appendChild(voteTitleCell);
                voteRow.appendChild(voteCell);

                recordTable.appendChild(voteRow);
            }
            panel.classList.remove("hidden");
            vacantContainer.classList.toggle("hidden", !councillors[i].isVacant)

        })
}

// contractable vote history tab
const recordHeader = document.getElementById("vote-history-header");
const recordIndicator = document.getElementById("vote-history-indicator");
const tableContainer = document.getElementById("vote-history-container");

let recordIsExpanded = true;
recordHeader.addEventListener("click", (e) => {
    tableContainer.classList.toggle("hidden");
    recordIsExpanded = !recordIsExpanded;
    recordIndicator.textContent = recordIsExpanded ? "expand_circle_up" : "expand_circle_down";
})

recordHeader.addEventListener("keypress", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      recordHeader.click();
    }
});

// close panel
button.addEventListener("click", (e) => {
    panel.classList.add("hidden");
})

button.addEventListener("keypress", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      button.click();
    }
});
console.log("Panel Loaded");
