import { generateCouncillors } from "./councilMap.js";
import { generateGroupings } from "./groupings.js";
import { addSummaryBackButtonListner } from "./summary.js";
import { setupSelectors } from "./selector.js";
import { addCouncillorBackButtonListener } from "./councillorList.js";
import { addCouncilNavListener } from "./councilnav.js";
import { addToggleListeners } from "./toggles.js";
import { addHelpButtonListeners } from "./helpButton.js";

console.log("loading main");
function main() {
    console.log("running main");
    addHelpButtonListeners();
    generateCouncillors(getCurrentYear());
    generateGroupings();
    setupSelectors();
    addSummaryBackButtonListner();
    addCouncillorBackButtonListener();
    addToggleListeners();
    addCouncilNavListener();
}

document.addEventListener("DOMContentLoaded", main);

if (document.readyState === "loading") {
    // Loading hasn't finished yet
    document.addEventListener("DOMContentLoaded", main);
} else {
    // `DOMContentLoaded` has already fired
    main();
}

console.log("Main load");