"use strict"

// Toggles name visibility for academic councillors
import { councillors}  from './councilMap.js';

const toggleNames = document.getElementById("toggleNames");

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


const toggleReps = document.getElementById("toggleReps");

function hideNode(node, bool) {
    if (bool)
        node.getNode().classList.add("hidden");
    else
        node.getNode().classList.remove("hidden");
}

toggleReps.addEventListener('change', function() {
    for(const c of councillors) {

        switch(c.getFaculty()) {
            case "AMRC":
            case "Apprentices":
            case "Foundation":
                hideNode(c, !this.checked);
                break;

            default:
                if(c.getType() == "Representative") { hideNode(c, !this.checked); }
        }
    }
});

const toggleCllrs = document.getElementById("toggleCllrs");

toggleCllrs.addEventListener('change', function() {
    for(const c of councillors) {
        switch(c.getFaculty()) {
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