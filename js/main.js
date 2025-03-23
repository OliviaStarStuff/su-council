import { generateCouncillors, addOverlayListener } from "./councilMap.js";
import { generateGroupings } from "./groupings.js";
import { addSummaryBackButtonListner } from "./summary.js";
import { setupSelectors, setupPolicyNavButtons } from "./selector.js";
import { addCouncillorBackButtonListener } from "./councillorList.js";
import { addCouncilNavListener } from "./councilnav.js";
import { addToggleListeners } from "./toggles.js";
import { addHelpButtonListeners } from "./helpButton.js";
import { addExpandTabEventListeners } from "./bottomPanel.js";
import { addMainNavEventListener } from "./mainNav.js";
import { addGroupTitleOverlayListener } from "./explanation.js";
import { addSearchListener } from "./search.js";
import { addCaptureButtonListener } from "./capture.js";

console.log("loading main");
function main() {
    console.log("running main");
    addHelpButtonListeners();
    generateCouncillors(getCurrentYear());
    addOverlayListener();
    generateGroupings();
    setupSelectors();
    setupPolicyNavButtons();
    addSummaryBackButtonListner();
    addCouncillorBackButtonListener();
    addToggleListeners();
    addCouncilNavListener();
    addExpandTabEventListeners();
    addMainNavEventListener();
    addGroupTitleOverlayListener();
    addSearchListener();
    addCaptureButtonListener();
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