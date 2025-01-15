"use strict";

/* Written by Olivia*/
// Import Data to display
import data from './councillors.json' with { type: 'json' };
const councillors = []

// We'll add all councillor objects to this section
const section = document.getElementById('visualisation');
const details = document.getElementById('details');
const detailRole = document.getElementById('detailRole');
const detailVote = document.getElementById('detailVote');

// Generate all councillors
for(const cData of data.councillors) {
    const councillor = new Councillor(!cData.isFilled, cData);
    councillor.getNode().addEventListener("mouseover", (e) => {
        detailRole.innerText = cData.title;
        detailVote.innerText = councillor.getVote();
    })

    councillor.getNode().addEventListener("mouseout", (e) => {
        detailRole.innerText = "";
        detailVote.innerText = "";
    })

    councillors.push(councillor);
    section.append(councillor.getNode());
}

document.addEventListener("mousemove", (e) => {
    details.style.left = e.clientX+"px";
    details.style.top = e.clientY+"px";
})

// Set up selector with all voting options
const policySelector = document.getElementById("policy");
for(var i = 0; i<data.records.length; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerText = data.records[i].name;
    policySelector.append(opt);
}

function displayVote(idx) {
    const record = data.records[idx].record;
    for(let i = 0; i < record.length; i++) {
        councillors[i].setVote(record[i]);
    }
}

function clear() {
    for(let i = 0; i < councillors.length; i++) {
        councillors[i].clearVote();
    }
}
policySelector.addEventListener("change", (e) => {
    if(e.target.value == "none") {
        clear();
    } else {
        displayVote(e.target.value);
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