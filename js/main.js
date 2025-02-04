import { councilMapMain } from "./councilMap.js"
import { selectorMain } from "./selector.js"
import { generateGroupings } from "./groupings.js"

function main() {
    createMessage("dom content loaded")
    councilMapMain();
    generateGroupings();
    selectorMain();
}

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", main);
} else {
// `DOMContentLoaded` has already fired
main();
}