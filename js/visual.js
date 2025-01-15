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
        details.classList.remove("details-empty");
    })

    councillor.getNode().addEventListener("mouseout", (e) => {
        detailRole.innerText = "";
        detailVote.innerText = "";
        details.classList.add("details-empty");
    })

    councillor.getNode().addEventListener("mouseenter", (e) => {
        details.classList.remove("details-empty");
    })

    councillors.push(councillor);
    section.append(councillor.getNode());
}

section.addEventListener("mousemove", (e) => {
    details.style.left = e.clientX+"px";
    details.style.top = e.clientY+20+"px";
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


// Toggles name visibility for academic councillors
const toggleNames = document.getElementById("toggleNames");

toggleNames.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.data.type) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                c.text.innerText = this.checked || c.data.title.includes("PGR") ? c.data.initial : "";
            break;
        }
    }
});


const toggleReps = document.getElementById("toggleReps");

toggleReps.addEventListener('change', function() {
    for(const c of councillors) {
        if(c.data.type == "Representative") {
            if (!this.checked)
                c.getNode().classList.add("hidden");
            else
                c.getNode().classList.remove("hidden");
        }
    }
});

const toggleCllrs = document.getElementById("toggleCllrs");

toggleCllrs.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.data.type) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                if (!this.checked)
                    c.getNode().classList.add("hidden");
                else
                    c.getNode().classList.remove("hidden");
            break;
        }
    }
});


const toggleSU = document.getElementById("toggleSU");

toggleSU.addEventListener('change', function() {
    for(const c of councillors) {
        if(c.data.type == "SU") {
            if (!this.checked)
                c.getNode().classList.add("hidden");
            else
                c.getNode().classList.remove("hidden");
        }
    }
});

const togglePTOs = document.getElementById("togglePTOs");

togglePTOs.addEventListener('change', function() {
    for(const c of councillors) {
        if(c.data.type == "PTO") {
            if (!this.checked)
                c.getNode().classList.add("hidden");
            else
                c.getNode().classList.remove("hidden");
        }
    }
});

const toggleFTOs = document.getElementById("toggleFTOs");

toggleFTOs.addEventListener('change', function() {
    for(const c of councillors) {
        if(c.data.type == "FTO") {
            if (!this.checked)
                c.getNode().classList.add("hidden");
            else
                c.getNode().classList.remove("hidden");
        }
    }
});

const toggleVacant = document.getElementById("toggleVacant");

toggleVacant.addEventListener('change', function() {
    for(const c of councillors) {
        if(c.isVacant) {
            if (!this.checked)
                c.getNode().classList.add("hidden-vacant");
            else
                c.getNode().classList.remove("hidden-vacant");
        }
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