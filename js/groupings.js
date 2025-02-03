"use strict";

import { groups } from "./councilMap.js";

// These are to set the overlay when you mouse over the groups
const overlay = document.getElementById('overlay')
const overlayRole = document.getElementById('overlay-role');
const overlayType = document.getElementById('overlay-type');
const overlayVote = document.getElementById('overlay-vote');

function setGroupOverlay(shape, name) {
    const cName = "member-" + sanitiseName(name);

    // Set event triggers
    shape.addEventListener("pointerout", (e) => {
        overlay.classList.add("display-hidden");
        overlay.classList.remove(cName);
    })

    shape.addEventListener("pointerenter", (e) => {
        overlayRole.innerText = name;
        overlayType.innerText = "";
        overlayVote.innerText = "";
        overlay.classList.remove("display-hidden");
        overlay.classList.add(cName);
    })
}

function setArchaeologyOverlay() {
    const cm = document.getElementById("council-container");
    const hiddenDiv = document.createElement("div");
    hiddenDiv.classList.add("member-lost");

    const hex = new Hex({"q":4,"r":0}, [24, 20]);
    const coords = hex.position;
    // I don't know why we have to add 1 but it works
    hiddenDiv.style.left = coords[0] + 1 + "px";
    hiddenDiv.style.top = coords[1] + 1 + "px";

    hiddenDiv.setAttribute("aria-label", "A black hexagon where the Archaeology Councillor would be positioned at axial coordinates q: 4, r: 0")

    cm.appendChild(hiddenDiv);
    hiddenDiv.addEventListener("pointerover", (e) => {
        overlayRole.innerText = "Archaeology Councillor";
        overlayType.innerText = "Forever Vacant";
        overlayVote.innerText = "";
        overlay.classList.remove("display-hidden");
    })

    hiddenDiv.addEventListener("pointerout", (e) => {
        overlay.classList.add("display-hidden");
    })
}

function generatePoints(shape, value) {
    for(const coords of value) {
        const point = svg.createSVGPoint();
        point.x = Hex.getLeft(coords);
        point.y = Hex.getTop(coords);
        // point.x = Hex.coords.q;
        // point.y = Hex.coords.r;
        shape.points.appendItem(point);
    }
}

// This is the main code we'll be running to generate the svg polygonal groups
let svg = document.getElementById("grids");
const yearSelector = document.getElementById("year-buttons");
const shapes = [];

export function generateGroupings() {
    const svgns = "http://www.w3.org/2000/svg";
    let shape = document.createElementNS(svgns, "polygon");
    shape.classList.add("group-background");
    generatePoints(shape, [
        { "q": -5.2, "r": 0 },
        { "q": 0, "r": -5.2 },
        { "q": 5.2, "r": -5.2 },
        { "q": 5.2, "r": 0 },
        { "q": 0, "r": 5.2 },
        { "q": -5.2, "r": 5.2 }
    ]);
    shape.setAttribute("role", "decorate");
    svg.appendChild(shape);

    for (const [key, value] of Object.entries(groups[getCurrentYear()])) {
        // main shape code
        const sanitisedName = sanitiseName(key);

        let shape = document.createElementNS(svgns, "polygon");
        shape.classList.add("group-" + sanitisedName);
        generatePoints(shape, value);

        // Add a title tag
        const title = document.createElement("title");
        title.innerText = key;
        title.setAttribute("id", "group-title-" + sanitisedName)
        shape.setAttribute("aria-describedby", "group-title-" + sanitisedName)
        shape.appendChild(title);

        svg.appendChild(shape);
        shapes.push(shape);

        // We don't want Grey to have any triggers
        if (key != "Grey") {
            // shape.setAttribute("tabindex", 0);
            if(key == "Archaeology") { setArchaeologyOverlay() }
            setGroupOverlay(shape, key);
        }
    }
}

generateGroupings();

console.log("Groupings Loaded");
