"use strict";

import { groups } from "./councilMap.js";

let svg = document.getElementById("grids");
const shapes = [];

// manually calculated. ideally it should be based on the height of the element
const offsetHeight = 288

function generatePoints(shape, value) {
    for(const coords of value) {
        const point = svg.createSVGPoint();
        point.x = Hex.getLeft(coords) + window.innerWidth/2;
        point.y = Hex.getTop(coords) + offsetHeight;
        shape.points.appendItem(point);
    }
}

function generateGroupings() {
    const svgns = "http://www.w3.org/2000/svg";
    for (const [key, value] of Object.entries(groups)) {
        let shape = document.createElementNS(svgns, "polygon");
        svg.appendChild(shape);
        shape.classList.add("group-" +
                key.replace(" & ","-and-").replace(" ", "-").toLowerCase());
        generatePoints(shape, value);

        const title = document.createElement("title")
        title.sinnerText = key;
        shape.appendChild(title)

        shapes.push(shape);
    }
}

export function regeneratePoints() {
    let i = 0;
    for (const [key, value] of Object.entries(groups)) {
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
