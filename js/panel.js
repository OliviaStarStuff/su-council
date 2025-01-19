import { councillors, records, options } from "./councilMap.js";

const button = document.getElementById("detail-close-button");
const panel = document.getElementById("councillor-panel");

const panelTitle = document.getElementById("panel-title");
const recordTable = document.getElementById("record-table");

for(let i = 0; i < councillors.length; i++) {

        councillors[i].getNode().addEventListener("click", (e) => {
            panelTitle.className = ''
            while(recordTable.firstChild) {
                console.log("removing")
                recordTable.removeChild(recordTable.firstChild);
            }
            console.log(councillors[i].data.title, councillors[i].getTitle())
            panelTitle.innerText =  councillors[i].getTitle();

            panelTitle.classList.add(councillors[i].getColourClass())
            for(const r of records) {
                let vote = r.votes[i];
                if (vote == "" ) { vote = "Vacant";}
                const voteTitleCell = document.createElement("td");
                voteTitleCell.innerText = r.name;
                const voteCell = document.createElement("td");
                voteCell.innerText = vote;
                const voteRow = document.createElement("tr");
                voteRow.appendChild(voteTitleCell);
                voteRow.appendChild(voteCell);
                recordTable.appendChild(voteRow);
            }
            // console.log("test")
            panel.classList.remove("hidden");

        })
}


button.addEventListener("click", (e) => {
    panel.classList.add("hidden");
})