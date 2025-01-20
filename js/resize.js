"use strict";

import { regeneratePoints } from "./groupings.js";

addEventListener("resize", (event) => {
    regeneratePoints();
});

console.log("Resize Loaded");
