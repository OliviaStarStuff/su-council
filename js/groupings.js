import { groups } from "./councilMap.js";

var svgns = "http://www.w3.org/2000/svg";
var svg = document.getElementById("grids");

const size = 20;
const width = Math.sqrt(3) * size;
const height =  4/2 * size;
const vert = 3/4 * height;
const horiz = width;

const shapes = [];

// manually calculated. ideally it should be based on the height of the element
const offsetHeight = 288

function generatePoints(shape, value) {
    for(const coords of value) {
        const point = svg.createSVGPoint();
        point.x = Councillor.getLeft(coords.q, coords.r, horiz) + window.innerWidth/2;
        point.y = Councillor.getTop(coords.r, vert) + offsetHeight;
        shape.points.appendItem(point);
    }
}

function generateGroupings() {
    for (const [key, value] of Object.entries(groups)) {
        let shape = document.createElementNS(svgns, "polygon");
        svg.appendChild(shape);
        shape.classList.add("group-" +
                key.replace(" & ","-and-").replace(" ", "-").toLowerCase());
        generatePoints(shape, value);
        shapes.push(shape);
    }
}

function regeneratePoints() {
    let i = 0;
    for (const [key, value] of Object.entries(groups)) {
        shapes[i].points.clear();
        generatePoints(shapes[i], value);
        i++;
    }
}

generateGroupings();

export { regeneratePoints } ;

const toggleSvg = document.getElementById("toggle-groupings");
toggleSvg.addEventListener("change", function() {
    if (!this.checked) {
        svg.classList.add("hidden");
    } else {
        svg.classList.remove("hidden");
    }
})
