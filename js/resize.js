import { regeneratePoints } from "./groupings.js";

addEventListener("resize", (event) => {
    regeneratePoints();
});