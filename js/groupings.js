import { groups } from "./councilMap.js";

var svgns = "http://www.w3.org/2000/svg";
var svg = document.getElementById("grids");

const size = 20;
const width = Math.sqrt(3) * size;
const height =  4/2 * size;
const vert = 3/4 * height;
const horiz = width;

for (const [key, value] of Object.entries(groups)) {
    var shape = document.createElementNS(svgns, "polygon");
    svg.appendChild(shape);
    shape.classList.add(
        "group-" + key.replace(" & ","-and-").replace(" ", "-").toLowerCase());
    for(const coords of value) {
        var point = svg.createSVGPoint();
        console.log(coords)
        point.x = Councillor.getLeft(coords.q, coords.r, horiz);
        point.y = Councillor.getTop(coords.r, vert);
        shape.points.appendItem(point);

    }
}

const toggleSvg = document.getElementById("toggleGroupings");
console.log(toggleSvg);
console.log(toggleSvg.checked);
toggleSvg.addEventListener("change", function() {
    if (!this.checked) {
        svg.classList.add("hidden");
    } else {
        svg.classList.remove("hidden");
    }
})
