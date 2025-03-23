"use strict";

import { updateCaptureText } from "./capture.js"

function addToggleListeners() {
    const toggleNames = document.getElementById("toggle-names");
    toggleNames.addEventListener('change', function() {
        for(const c of Councillor.list) {
            switch(c.type) {
                case "Academic":
                case "Specialised":
                case "PGR":
                    c.initial = !this.checked;
                    break;
            }
        }
    });

    const toggleSUNames = document.getElementById("toggle-su-names");
    toggleSUNames.addEventListener('change', function() {
        for(const c of Councillor.list) {
            switch(c.type) {
                case "SU":
                case "Representative":
                case "FTO":
                case "PTO":
                    c.initial = !this.checked;
                    break;
            }
        }
    });

    const toggleGoneNodes = document.getElementById("toggle-gone-nodes");
    toggleGoneNodes.addEventListener('change', function() {
        let nodes = document.getElementsByClassName("member-lost")
        for(const c of nodes) {
            c.classList.toggle("display-hidden", !this.checked);
        }
        nodes = document.getElementsByClassName("group-gone")
        for(const c of nodes) {
            c.classList.toggle("display-hidden", !this.checked);
        }
    });

    const toggleAllNames = document.getElementById("toggle-all-names");
    toggleAllNames.addEventListener('change', function() {
        for(const c of Councillor.list) {c.initial = !this.checked; }
        toggleNames.checked = this.checked;
        toggleSUNames.checked = this.checked;
    });

    const toggleGraphic = document.getElementById("toggle-graphic");
    toggleGraphic.addEventListener('change', function() {
        Vote.isSimple = this.checked;
        for(const c of Councillor.list) {c.updateVoteClasses(); }
    });

    const toggleQR = document.getElementById("toggle-qr");
    toggleQR.addEventListener('change', function() {
        document.getElementById("qrcode").classList.toggle("display-hidden", !this.checked);
    });

    const toggleCapture = document.getElementById("toggle-capture");
    toggleCapture.addEventListener('change', function() {

        const captureButton = document.getElementById("capture-button");
        const textContainer = document.querySelector("#visual-container-description");
        const yearButtons = document.getElementById("year-buttons-container");
        const helpButton = document.getElementById("help-button");

        updateCaptureText();

        yearButtons.classList.toggle("display-hidden", this.checked);
        helpButton.classList.toggle("display-hidden", this.checked);
        captureButton.classList.toggle("display-hidden", this.checked);
        textContainer.classList.toggle("display-hidden", !this.checked);
    });


    const toggleReps = document.getElementById("toggle-reps");
    toggleReps.addEventListener('change', function() { toggleHidden("Representative", !this.checked); });

    const toggleCllrs = document.getElementById("toggle-cllrs");
    toggleCllrs.addEventListener('change', function() {
        for(const c of Councillor.list) {
            switch(c.faculty) {
                case "Social Science":
                case "Science":
                case "Arts & Humanities":
                case "Engineering":
                case "Health":
                    c.classList.toggle("opacity-hidden", !this.checked);
                break;
            }
        }
    });

    function toggleHidden(targetToMatch, bool) {
        for(const c of Councillor.list) {
            if(targetToMatch == "PTO" &&
                (getCurrentYear() != "2023/2024" && getCurrentYear() != "2023/2024")) {
                console.log(c.type);
                if(c.type == "Liberation Facilitator") {
                    c.classList.toggle("opacity-hidden", bool);
                }
            } else if(c.type == targetToMatch) {
                c.classList.toggle("opacity-hidden", bool);
            }
        }
    }

    const toggleAcademic = document.getElementById("toggle-specialised");
    const toggleSU = document.getElementById("toggle-su");
    const togglePTOs = document.getElementById("toggle-ptos");
    const toggleFTOs = document.getElementById("toggle-ftos");

    toggleAcademic.addEventListener('change', function() { toggleHidden("Specialised", !this.checked); });
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

    const toggleAll = document.getElementById("toggle-all");
    toggleAll.addEventListener('change', function() {
        for(const c of Councillor.list) {
            c.classList.toggle("opacity-hidden", !this.checked);
        }
        toggleAcademic.checked = this.checked;
        toggleCllrs.checked = this.checked;
        toggleFTOs.checked = this.checked;
        togglePTOs.checked = this.checked;
        toggleReps.checked = this.checked;
        toggleSU.checked = this.checked;

    });

    const svg = document.getElementById("grids");
    const toggleSvg = document.getElementById("toggle-groupings");
    toggleSvg.addEventListener("change", function() {
        if (!this.checked) {
            svg.classList.add("opacity-hidden");
        } else {
            svg.classList.remove("opacity-hidden");
        }
    });
}

export { addToggleListeners }

console.log("Toggles Loaded");
