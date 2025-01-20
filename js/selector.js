"use strict";

import { councillors, records, options } from "./councilMap.js";

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
            if(!councillors[i].isVacant) { councillors[i].clearVote(); }
            // councillors[i].setCurrentPosition();
        }
    } else {
        const record = records[e.target.value];
        const optionStyle = record.style;
        const targetOptions = optionStyle == "custom" ? record.options : options[optionStyle];
        for(let i = 0; i < record.votes.length; i++) {
            councillors[i].setVote(record.votes[i], targetOptions, optionStyle);
        }
    }
});

policySelector.focus();

console.log("Selector Loaded");
