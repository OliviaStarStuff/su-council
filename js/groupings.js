"use strict";

import { groups } from "./councilMap.js";

let svg = document.getElementById("grids");

const yearSelector = document.getElementById("year-select");
const shapes = [];

// manually calculated. ideally it should be based on the height of the element
const offsetHeight = 288

function generatePoints(shape, value) {
    for(const coords of value) {
        const point = svg.createSVGPoint();
        point.x = Hex.getLeft(coords)
        point.y = Hex.getTop(coords)
        shape.points.appendItem(point);
    }
}

export function generateGroupings() {
    const svgns = "http://www.w3.org/2000/svg";
    for (const [key, value] of Object.entries(groups[yearSelector.value])) {
        let shape = document.createElementNS(svgns, "polygon");
        svg.appendChild(shape);
        shape.classList.add("group-" +
                key.replace(" & ","-and-").replace(" ", "-").toLowerCase());
        generatePoints(shape, value);

        const title = document.createElement("title");
        title.innerText = key;
        shape.appendChild(title);

        if(key == "Archaeology") {
            const cm = document.getElementById("council-map");
            const hiddenDiv = document.createElement("div");
            hiddenDiv.classList.add("member-lost");

            const hex = new Hex({"q":4,"r":0}, [24, 20]);
            const coords = hex.position;
            hiddenDiv.style.left = coords[0] + 1 + "px";
            hiddenDiv.style.top = coords[1] + 1 + "px";

            cm.appendChild(hiddenDiv);

            hiddenDiv.addEventListener("pointerover", (e) => {
                const overlayRole = document.getElementById('overlay-role');
                const overlayType = document.getElementById('overlay-type');
                const overlayVote = document.getElementById('overlay-vote');
                overlayRole.innerText = "Archaeology Councillor";
                overlayType.innerText = "Forever Vacant";
                overlayVote.innerText = "";
                overlay.classList.remove("display-hidden");
            })

            hiddenDiv.addEventListener("pointerout", (e) => {
                overlay.classList.add("display-hidden");
            })
        }

        shapes.push(shape);
    }
}

// yearSelector.addEventListener("change", (e) => {
//     clearChildren("grids");
//     generateGroupings();
// });

export function regeneratePoints() {
    let i = 0;
    for (const [key, value] of Object.entries(groups[yearSelector.value])) {
        shapes[i].points.clear();
        generatePoints(shapes[i], value);
        i++;
    }
}

generateGroupings();

const toggleSvg = document.getElementById("toggle-groupings");
toggleSvg.addEventListener("change", function() {
    if (!this.checked) {
        svg.classList.add("hidden");
    } else {
        svg.classList.remove("hidden");
    }
})

console.log("Groupings Loaded");
