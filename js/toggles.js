"use strict"

// Toggles name visibility for academic councillors
import { councillors, records}  from './councilMap.js';

const toggleNames = document.getElementById("toggle-names");

toggleNames.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.getFaculty()) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                c.text.innerText = this.checked || c.getType() == "PGR" ? c.data.initial : "";
            break;
        }
    }
});


const toggleReps = document.getElementById("toggle-reps");

toggleReps.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.getFaculty()) {
            case "AMRC":
            case "Apprentices":
            case "Foundation":
                c.getNode().classList.toggle("hidden", !this.checked);
                break;
            default:
                if(c.getType() == "Representative") {
                    c.getNode().classList.toggle("hidden", !this.checked);
                }
        }
    }
});

const toggleCllrs = document.getElementById("toggle-cllrs");

toggleCllrs.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.getFaculty()) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                c.getNode().classList.toggle("hidden", !this.checked);
            break;
        }
    }
});

function toggleHidden(node, type, targetToMatch, bool) {
    if(type == targetToMatch) {
        node.classList.toggle("hidden", bool);
    }
}

const toggleSU = document.getElementById("toggle-su");

toggleSU.addEventListener('change', function() {
    for(const c of councillors) {
        toggleHidden(c.getNode(), c.data.type, "SU", !this.checked);
    }
});

const togglePTOs = document.getElementById("toggle-ptos");

togglePTOs.addEventListener('change', function() {
    for(const c of councillors) {
        toggleHidden(c.getNode(), c.data.type, "PTO", !this.checked);
    }
});

const toggleFTOs = document.getElementById("toggle-ftos");

toggleFTOs.addEventListener('change', function() {
    for(const c of councillors) {
        toggleHidden(c.getNode(), c.data.type, "FTO", !this.checked);
    }
});

const toggleVacant = document.getElementById("toggle-vacant");
const policySelector = document.getElementById("policy");
console.log()
toggleVacant.addEventListener('change', function() {
    let i = 0;
    const value = policySelector.value;

    for(const c of councillors) {
        if(c.isVacant || ( value != "none" && records[value].votes[i] == "")) {
            c.getNode().classList.toggle("hidden-vacant", !this.checked);
        }
        i++;
    }
});