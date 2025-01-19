import { councillors, records, options } from "./councilMap.js";

const button = document.getElementById("panel-close-button");
const panel = document.getElementById("councillor-panel");

const panelTitle = document.getElementById("panel-title");
const recordTable = document.getElementById("record-table");
const vacantContainer = document.getElementById("panel-vacant-container");

for(let i = 0; i < councillors.length; i++) {

        councillors[i].getNode().addEventListener("click", (e) => {
            panelTitle.className = ''
            while(recordTable.firstChild) {
                recordTable.removeChild(recordTable.firstChild);
            }
            panelTitle.innerText =  councillors[i].getTitle();

            panelTitle.classList.add(councillors[i].getColourClass())
            for(const r of records) {
                let vote = r.votes[i];
                if (councillors[i].isVacant || vote == "") {
                    vote = "Vacant";
                    continue;
                }
                if (vote == "No Vote") { vote = "Absent" };

                const voteTitleCell = document.createElement("td");
                voteTitleCell.innerText = r.name;

                const voteCell = document.createElement("td");
                voteCell.classList.add(Councillor.getVoteClass(vote, r.options));
                voteCell.innerText = vote;

                const voteRow = document.createElement("tr");
                voteRow.appendChild(voteTitleCell);
                voteRow.appendChild(voteCell);

                recordTable.appendChild(voteRow);
            }
            // console.log("test")
            panel.classList.remove("hidden");
            vacantContainer.classList.toggle("hidden", !councillors[i].isVacant)

        })
}

// contractable options tab
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
