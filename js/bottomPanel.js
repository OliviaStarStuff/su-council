"use strict";

const expandTab = document.getElementById("expand-tab");
const bottomPanel = document.getElementById("bottom-panel");

function addExpandTabEventListeners() {
    expandTab.addEventListener("touchstart", handleStart);
    expandTab.addEventListener("touchend", handleEnd);
    expandTab.addEventListener("touchcancel", handleCancel);
    expandTab.addEventListener("touchmove", handleMove);
    expandTab.addEventListener("click", (e) => {
        isClosed = !isClosed;
        handleCancel(e);
    })
}

let startPos = 0;
let isClosed = true;
const threshold = 50;
const openPos = "-42px";
const closePos = "335px";

function handleStart(e) {
    e.preventDefault()
    const touches = e.changedTouches;
    startPos = touches[0].pageY;
    console.log(touches[0].pageY);
}

function handleEnd(e) {
    e.preventDefault()
    const touches = e.changedTouches;
    if (isClosed && startPos - touches[0].pageY >= threshold ||
        !isClosed && touches[0].pageY - startPos < threshold) {
        bottomPanel.style.setProperty("--touch-y", openPos);
        isClosed = false;
    } else if (!isClosed && touches[0].pageY - startPos >= threshold ||
        isClosed && startPos - touches[0].pageY < threshold) {
        bottomPanel.style.setProperty("--touch-y", closePos);
        isClosed = true;
    }
    bottomPanel.classList.add("height-transition");
    setTimeout(() => { bottomPanel.classList.remove("height-transition"); }, 800);
}

function handleCancel(e) {
    bottomPanel.style.setProperty("--touch-y", isClosed ? closePos : openPos);
    bottomPanel.classList.add("height-transition");
    setTimeout(() => { bottomPanel.classList.remove("height-transition"); }, 800);
}

function handleMove(e) {
    e.preventDefault()
    const touches = e.changedTouches;
    bottomPanel.style.setProperty("--touch-y", touches[0].pageY - 100 + "px");
}

export { addExpandTabEventListeners }