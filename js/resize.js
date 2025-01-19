import { councillors } from "./councilMap.js";
import { regeneratePoints } from "./groupings.js";

var svg = document.getElementById("grids");

let doit;

addEventListener("resize", (event) => {
    clearTimeout(doit);
    Councillor.center = [window.innerWidth/2, Councillor.center.y]
    for (const c of councillors) {
        c.setCurrentPosition();
    }
    // doit = setTimeout(regeneratePoints, 100);
});