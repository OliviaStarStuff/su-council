import { councillors } from "./councilMap.js";
import { regeneratePoints } from "./groupings.js";

var svg = document.getElementById("grids");


addEventListener("resize", (event) => {
    Councillor.center = [window.innerWidth/2, Councillor.center[1]]
    for (const c of councillors) {
        c.setCurrentPosition();
    }
    regeneratePoints();
    // doit = setTimeout(, 100);
});