"use strict";

// Does not work with firefox 15/01/2025
// import data from './councillors.json' with { type: 'json' };
import { data } from "./loadData.js"
// const councillors = []
// export const records = data.records;
// export const groups = data.groups;

function generateDataExport(attribute) {
    const recordOutput = {};
    for (const key in data) {
        recordOutput[key] = data[key][attribute];
    }
    return recordOutput;
}

export const records = generateDataExport("records");
export const groups = generateDataExport("groups");


// We'll add all councillor objects to this section
const councilMap = document.getElementById('council-map');
// These are overlay hooks
const overlay = document.getElementById('overlay');
const overlayRole = document.getElementById('overlay-role');
const overlayType = document.getElementById('overlay-type');
const overlayVote = document.getElementById('overlay-vote');

// Generate all councillors
let i = 0;

export function generateCouncillors(fromYear) {
    const fromData = data[fromYear];
    Vote.styles = fromData.voteOptions;
    for(const cData of fromData.councillors) {
        cData.history = [];
        let j = 0;
        for (const record of fromData.records) {
            const vote = record.votes[i] == "No Vote"? "Absent" : record.votes[i];
            cData.history.push({"name": record.name, "style":record.style, "vote": vote});
            j++;
        };
        const councillor = new Councillor(cData);

        councillor.index = i;
        i++;

        councillor.node.addEventListener("pointerover", (e) => {
            overlayRole.innerText = councillor.title;
            overlayType.innerText = "Type: " + councillor.type + ", Faculty: " + councillor.faculty;
            overlayType.innerText = "Type: " + councillor.type + ", Faculty: " + councillor.faculty+councillor.coords;

            // Set vacant status
            if(councillor.isVacant) {
                overlayVote.innerText = "Vacant";
            } else {
                overlayVote.innerText = councillor.vote;
            }
            overlay.classList.remove("display-hidden");
        })

        councillor.node.addEventListener("pointerout", (e) => {
            overlay.classList.add("display-hidden");
        })

        councillor.node.addEventListener("pointerenter", (e) => {
            overlay.classList.remove("display-hidden");
        })

        Councillor.list.push(councillor);
        councilMap.appendChild(councillor.node);
    }
}

generateCouncillors("2024/2025");   


councilMap.addEventListener("pointermove", (e) => {
    overlay.style.left = e.pageX+"px";
    overlay.style.top = e.pageY-50 + "px";
})

const visualisation = document.getElementById("visualisation");

let drag = false;
const pos = {"x": 0, "y": 0};
const offsetPos = {"x": 0, "y": 0};

visualisation.addEventListener('pointerdown', (e) => {
    drag = true
    offsetPos.x = e.clientX-pos.x;
    offsetPos.y = e.clientY-pos.y;
});

document.addEventListener('pointerup', () => {
    drag = false;
});

document.addEventListener('pointermove', (e) => {
        if(drag) {
            pos.x = e.clientX - offsetPos.x;
            pos.y = e.clientY - offsetPos.y;
            visualisation.style.left = pos.x + "px";
            visualisation.style.top = pos.y + "px";
        }
});

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