"use strict";

// Does not work with firefox 15/01/2025
// import data from './councillors.json' with { type: 'json' };
import { data } from "./loadData.js"
export const councillors = []
export const records = data.records;
export const options = data.voteOptions;
export const groups = data.groups;

// We'll add all councillor objects to this section
const councilMap = document.getElementById('council-map');
// These are overlay hooks
const overlay = document.getElementById('overlay');
const overlayRole = document.getElementById('overlay-role');
const overlayType = document.getElementById('overlay-type');
const overlayVote = document.getElementById('overlay-vote');

// Generate all councillors
let i = 0;
for(const cData of data.councillors) {
    cData.history = [];
    let j = 0;
    for (const record of data.records) {
        const vote = record.votes[i] == "No Vote"? "Absent" : record.votes[i];
        cData.history.push({"name": record.name, "vote": vote, "index":j});
        j++;
    };
    const councillor = new Councillor(cData);
    councillor.index = i;
    i++;

    councillor.getNode().addEventListener("pointerover", (e) => {
        overlayRole.innerText = councillor.getTitle();
        overlayType.innerText = "Type: " + councillor.getType() + ", Faculty: " + councillor.getFaculty();

        // Set vacant status
        if(councillor.isVacant) {
            overlayVote.innerText = "Vacant";
        } else {
            overlayVote.innerText = councillor.getVote();
        }
        overlay.classList.remove("hidden");
    })

    councillor.getNode().addEventListener("pointerout", (e) => {
        overlay.classList.add("hidden");
    })

    councillor.getNode().addEventListener("pointerenter", (e) => {
        overlay.classList.remove("hidden");
    })

    councillors.push(councillor);
    councilMap.appendChild(councillor.getNode());
}

councilMap.addEventListener("pointermove", (e) => {
    overlay.style.left = e.clientX+"px";
    overlay.style.top = e.clientY+20+"px";
})

// for (let q = -gs+1; q < gs; q++) {
//     const r_start = q < 0 ? -gs-q : -gs;
//     const r_end = q < 0 ? gs : gs-q;
//     for(let r = r_start; r < r_end-1; r++) {
//         console.log(q, r);
//         const councilor = new Councillor(false, q, r, "member-pto");
//         section.append(councilor.getNode());
//     }
// }

console.log("councilMap Loaded");