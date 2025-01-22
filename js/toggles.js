"use strict"

// Toggles name visibility for academic councillors
import { councillors, records }  from './councilMap.js';

// contractable options tab
const togglesHeader = document.getElementById("toggles-header");

let togglesIsExpanded = false;
const toggleContractable = contractable("toggles");
togglesHeader.addEventListener("click", (e) => { togglesIsExpanded = toggleContractable(togglesIsExpanded); })

togglesHeader.addEventListener("keypress", function(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglesHeader.click();
    }
});

const toggleNames = document.getElementById("toggle-names");

toggleNames.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.faculty) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                c.showInitial = (this.checked || c.type == "PGR");
            break;
        }
    }
});


const toggleReps = document.getElementById("toggle-reps");
toggleReps.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.faculty) {
            case "AMRC":
            case "Apprentices":
            case "Foundation":
                c.classList.toggle("hidden", !this.checked);
                break;
            default:
                if(c.type == "Representative") {
                    c.classList.toggle("hidden", !this.checked);
                }
        }
    }
});

const toggleCllrs = document.getElementById("toggle-cllrs");
toggleCllrs.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.faculty) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                c.classList.toggle("hidden", !this.checked);
            break;
        }
    }
});

function toggleHidden(targetToMatch, bool) {
    for(const c of councillors) {
        if(c.type == targetToMatch) {
            c.classList.toggle("hidden", bool);
        }
    }
}

const toggleSU = document.getElementById("toggle-su");
const togglePTOs = document.getElementById("toggle-ptos");
const toggleFTOs = document.getElementById("toggle-ftos");

toggleSU.addEventListener('change', function() { toggleHidden("SU", !this.checked); });
togglePTOs.addEventListener('change', function() { toggleHidden("PTO", !this.checked); });
toggleFTOs.addEventListener('change', function() { toggleHidden("FTO", !this.checked); });


const toggleVacant = document.getElementById("toggle-vacant");
const policySelector = document.getElementById("policy");
toggleVacant.addEventListener('change', function() {
    let i = 0;
    const value = policySelector.value;

    for(const c of councillors) {
        if(c.isVacant || ( value != "none" && records[value].votes[i] == "")) {
            c.classList.toggle("hidden-vacant", !this.checked);
        }
        i++;
    }
});

console.log("Toggles Loaded");
