"use strict";

const helpOverLay = document.getElementById("overlay-group-titles");
const openButton = document.getElementById("help-button");
const titlesContainer = document.getElementById("group-text-container");
const overlayButton = document.getElementById("overlay-button");

const overlay = document.getElementById('group-title-info');
const overlayList = document.getElementById("overlay-list");

let currentColour;
function addGroupTitleOverlayListener() {
    openButton.addEventListener("click", () => {
        helpOverLay.classList.toggle("display-hidden");
    })

    overlayButton.addEventListener("click", () => {
        console.log("clicked!");
        overlay.classList.add("display-hidden");
    })


    if (window.innerWidth >= 600) {
        for (const node of titlesContainer.children) {
            const searchKey = node.innerText == "Special" ? "Specialised" : node.innerText;

            const mymap = new Map();
            const group = Councillor.getGroup(searchKey).filter(c => {
                if (!mymap.get(c.initial)) {
                    mymap.set(c.initial, c.title);
                    return true;
                }
                return false;
            })

            node.addEventListener("click", (e) => {
                overlay.classList.remove("display-hidden");
                overlay.classList.remove(currentColour);
                overlay.classList.add(group[0].colourClass);
                currentColour = group[0].colourClass;
                clearChildren("overlay-list")
                for (const c of group) {
                    const title = document.createElement("p");
                    const initial = document.createElement("p");
                    title.innerText = c.initial;
                    initial.innerText = c.title;
                    overlayList.appendChild(title);
                    overlayList.appendChild(initial);
                }
            });
        }
    }
}

export { addGroupTitleOverlayListener }
