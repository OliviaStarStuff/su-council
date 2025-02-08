"use strict";

const overlay = document.getElementById("overlay-group-titles");
const openButton = document.getElementById("help-button");

function addGroupTitleOverlayListener() {
    openButton.addEventListener("click", () => {
        overlay.classList.toggle("display-hidden");
    })
}

export { addGroupTitleOverlayListener }
