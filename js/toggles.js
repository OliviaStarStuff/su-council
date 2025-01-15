"use strict"

// Toggles name visibility for academic councillors
import { councillors}  from './councilMap.js';

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