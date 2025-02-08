"use strict";

const helpButton = document.getElementById("help-button");
const helpOverlay = document.getElementById("help-overlay");
const helpcloseButton = document.getElementById("help-close-button");

function addHelpButtonListeners() {
    // helpButton.addEventListener("click", () => { helpOverlay.classList.remove("display-hidden"); })
    helpcloseButton.addEventListener("click", () => { helpOverlay.classList.add("display-hidden"); })
}

export { addHelpButtonListeners }