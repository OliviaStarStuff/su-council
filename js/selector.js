"use strict"

import { councillors, records } from "./councilMap.js";

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
            councillors[i].clearVote();
        }
    } else {
        const record = records[e.target.value].record;
        for(let i = 0; i < record.length; i++) {
            councillors[i].setVote(record[i]);
        }
    }
});