import { groups } from "./councilMap.js";

var svgns = "http://www.w3.org/2000/svg";
var svg = document.getElementById("grids");

const size = 20;
const width = Math.sqrt(3) * size;
const height =  4/2 * size;
const vert = 3/4 * height;
const horiz = width;

const shapes = [];
function generateGroupings() {
    for (const [key, value] of Object.entries(groups)) {
        let shape = document.createElementNS(svgns, "polygon");
        svg.appendChild(shape);
        shape.classList.add(
            "group-" + key.replace(" & ","-and-").replace(" ", "-").toLowerCase());
        for(const coords of value) {
            const point = svg.createSVGPoint();
            point.x = Councillor.getLeft(coords.q, coords.r, horiz);
            point.y = Councillor.getTop(coords.r, vert);
            shape.points.appendItem(point);
        }
        shapes.push(shape);
    }
}

function regeneratePoints() {
    let i = 0;
    for (const [key, value] of Object.entries(groups)) {
        shapes[i].points.clear();
        // console.log("start", shapes[i].points);
        for(const coords of value) {
            const point = svg.createSVGPoint();
            point.x = Councillor.getLeft(coords.q, coords.r, horiz);
            point.y = Councillor.getTop(coords.r, vert);
            shapes[i].points.appendItem(point);
        }
        // console.log(shapes[i].points)
        // console.log("end", shapes[i].points);
        i++;

    }
}

generateGroupings();

export { regeneratePoints } ;

const toggleSvg = document.getElementById("toggleGroupings");
toggleSvg.addEventListener("change", function() {
    if (!this.checked) {
        svg.classList.add("hidden");
    } else {
        svg.classList.remove("hidden");
    }
})
