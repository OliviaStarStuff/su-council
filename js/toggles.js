"use strict"

const toggleNames = document.getElementById("toggle-names");
toggleNames.addEventListener('change', function() {
    for(const c of Councillor.list) {
        c.showInitial = !this.checked;
    }
});


const toggleReps = document.getElementById("toggle-reps");
toggleReps.addEventListener('change', function() {
    for(const c of Councillor.list) {
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
    for(const c of Councillor.list) {
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
    for(const c of Councillor.list) {
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
const policySelector = document.getElementById("policy-select");
toggleVacant.addEventListener('change', function() {
    let i = 0;
    const value = policySelector.value;

    for(const c of Councillor.list) {
        if(c.isCurrentlyVacant) {
            c.classList.toggle("hidden-vacant", !this.checked);
        }
        i++;
    }
});

console.log("Toggles Loaded");
