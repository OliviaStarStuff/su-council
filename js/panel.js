import { councillors, records } from "./councilMap.js";

const button = document.getElementById("panel-close-button");
const panel = document.getElementById("councillor-panel");

const panelTitle = document.getElementById("panel-title");
const panelTitleContainer = document.getElementById("panel-title-container");
const recordTable = document.getElementById("record-table");
const vacantContainer = document.getElementById("panel-vacant-container");
const gridMain = document.getElementById("grid-main");


for(let i = 0; i < councillors.length; i++) {
        councillors[i].node.addEventListener("click", (e) => {
            // open panel;
            isExpanded = true;
            closeIndicator.innerText = "chevron_right";
            panel.classList.add("panel-open");
            gridMain.classList.remove("display-hidden");

            // Set panel stylings
            panelTitle.className = '';
            button.className = '';
            button.classList.add(councillors[i].colourClass);
            panelTitle.classList.add(councillors[i].colourClass);
            panelTitle.innerText =  councillors[i].title;

            // populatate vote history table;
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
            panel.classList.remove("display-hidden");
            vacantContainer.classList.toggle("display-hidden", !councillors[i].isVacant)
        })
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

// button.addEventListener("keypress", function(event) {
//     if (event.key === "Enter" || event.key === " ") {
//       event.preventDefault();
//       button.click();
//     }
// });
console.log("Panel Loaded");
