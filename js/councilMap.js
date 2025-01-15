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
const section = document.getElementById('visualisation');
// These are overlay hooks
const details = document.getElementById('details');
const detailRole = document.getElementById('detailRole');
const detailType = document.getElementById('detailType');
console.log(detailType);
const detailVote = document.getElementById('detailVote');

// Generate all councillors
for(const cData of data.councillors) {
    const councillor = new Councillor(cData);
    councillor.getNode().addEventListener("mouseover", (e) => {
        detailRole.innerText = cData.title;
        detailType.innerText = "Type: " + councillor.getType() + ", Faculty: " + councillor.getFaculty();
        if(councillor.isVacant) {
            detailVote.innerText = "Vacant";
        } else {
            detailVote.innerText = councillor.getVote();
        }
        details.classList.remove("hidden");
    })

    councillor.getNode().addEventListener("mouseout", (e) => {
        details.classList.add("hidden");
    })

    councillor.getNode().addEventListener("mouseenter", (e) => {
        details.classList.remove("hidden");
    })

    councillors.push(councillor);
    section.append(councillor.getNode());
}

section.addEventListener("mousemove", (e) => {
    details.style.left = e.clientX+"px";
    details.style.top = e.clientY+20+"px";
})

export const records = data.records;

// for (let q = -gs+1; q < gs; q++) {
//     const r_start = q < 0 ? -gs-q : -gs;
//     const r_end = q < 0 ? gs : gs-q;
//     for(let r = r_start; r < r_end-1; r++) {
//         console.log(q, r);
//         const councilor = new Councillor(false, q, r, "member-pto");
//         section.append(councilor.getNode());
//     }
// }