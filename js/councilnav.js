"use strict";

import { resetCouncillor } from "./councillorList.js";
import { resetVotesList } from "./selector.js";

const councilNav = document.getElementById("council-nav");
const content = document.getElementById("council-content");

const currentYear = getCurrentYear()

const tabs = [];
for (const tab of content.children) {
    if (tab.id.includes("-tab")) {
        tabs.push(tab);
    }
}

function setTabAsVisible(tab) {
    for (const t of tabs) {
        t.classList.toggle("display-hidden", t != tab);
    }
}

for(let i = 0; i < councilNav.children.length; i++) {
    councilNav.children[i].addEventListener("click", e => {
        setTabAsVisible(tabs[i]);
        for (const b of councilNav.children) {
            b.classList.toggle("selected", b == councilNav.children[i]);
        }
        switch(councilNav.children[i].id) {
            case "nav-votes":
                resetVotesList();
                break;
            case "nav-councillors":
                resetCouncillor();
                break;
            case "nav-summary":

                break;
        }
    });
}
