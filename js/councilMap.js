"use strict";

/* Written by Olivia*/
// Import Data to display
const data = await fetch("./js/councillors.json").then(response => {
    return response.json()
});

// Does not work with firefox 15/01/2025
// import data from './councillors.json' with { type: 'json' };

export const councillors = []

// We'll add all councillor objects to this section
const councilMap = document.getElementById('council-map');
// These are overlay hooks
const overlay = document.getElementById('overlay');
const overlayRole = document.getElementById('overlay-role');
const overlayType = document.getElementById('overlay-type');
const overlayVote = document.getElementById('overlay-vote');

// Generate all councillors
var i = 0;
for(const cData of data.councillors) {
    const cData = data.councillors[i]
    const councillor = new Councillor(cData);
    councillor.index = i;
    i++;
    councillor.getNode().addEventListener("mouseover", (e) => {
        overlayRole.innerText = cData.title;
        overlayType.innerText = "Type: " + councillor.getType() + ", Faculty: " + councillor.getFaculty();
        if(councillor.isVacant) {
            overlayVote.innerText = "Vacant";
        } else {
            overlayVote.innerText = councillor.getVote();
        }
        overlay.classList.remove("hidden");
    })

    councillor.getNode().addEventListener("mouseout", (e) => {
        overlay.classList.add("hidden");
    })

    councillor.getNode().addEventListener("mouseenter", (e) => {
        overlay.classList.remove("hidden");
    })

    councillors.push(councillor);
    councilMap.appendChild(councillor.getNode());
}

councilMap.addEventListener("mousemove", (e) => {
    overlay.style.left = e.clientX+"px";
    overlay.style.top = e.clientY+20+"px";
})

export const groups = data.groups;
export const records = data.records;
export const options = data.voteOptions;

// for (let q = -gs+1; q < gs; q++) {
//     const r_start = q < 0 ? -gs-q : -gs;
//     const r_end = q < 0 ? gs : gs-q;
//     for(let r = r_start; r < r_end-1; r++) {
//         console.log(q, r);
//         const councilor = new Councillor(false, q, r, "member-pto");
//         section.append(councilor.getNode());
//     }
// }