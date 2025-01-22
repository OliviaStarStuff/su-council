"use strict";

import { councillors, records } from "./councilMap.js";

const notloaded = document.createElement("p");
notloaded.innerText = "not loaded";
document.getElementById("summary").appendChild(notloaded);


// Set up selector with all voting options
const policySelector = document.getElementById("policy");

for(var i = 0; i<records.length; i++) {
    let opt = document.createElement('option');
    opt.value = i;
    opt.innerText = records[i].name;
    policySelector.append(opt);
}

policySelector.addEventListener("change", (e) => {
    if(e.target.value == "none") {
        for(let i = 0; i < councillors.length; i++) {
            if(!councillors[i].isVacant) { councillors[i].clearVoteClasses(); }
        }
    } else {
        const record = records[e.target.value];
        const optionStyle = record.style;
        for(const c of councillors) {
            if(!c.isVacant) { c.vote = e.target.value;}

        }
    }
});

policySelector.focus();

console.log("Selector Loaded");
notloaded.classList.add("hidden");
