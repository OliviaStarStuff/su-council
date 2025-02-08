"use strict";

import { openCouncillorPanel } from "./councillorList.js"

const searchBox = document.getElementById("councillor-search");
const resultBox = document.getElementById("councillor-search-results");
const template = document.getElementById("councillor-item-template");
const clearButton = document.getElementById("councillor-search-clear-button");

const list = [
    {
        "title": "Engineering",
        "name": "Steven"
    },
    {
        "title": "Faculty",
        "name": "Stevonnie"
    },
    {
        "title": "Engineering",
        "name": "Steven"
    }
]


// Change the pattern
const searchPattern = ""

function addSearchListener() {
    const fuseOptions = {
        // isCaseSensitive: false,
        // includeScore: false,
        // ignoreDiacritics: false,
        // shouldSort: true,
        // includeMatches: false,
        // findAllMatches: false,
        // minMatchCharLength: 1,
        // location: 0,
        // threshold: 0.6,
        // distance: 100,
        // useExtendedSearch: false,
        // ignoreLocation: false,
        // ignoreFieldNorm: false,
        // fieldNormWeight: 1,
        threshold: 0.4,
        keys: [
            "title",
            "name",
            "initial",
            "faculty",
            "type"
        ]
    };
    const fuse = new Fuse(Councillor.list, fuseOptions);
    searchBox.addEventListener("change", (e) => {
        clearChildren(resultBox.id)
        if (e.target.value == "") return;
        const result = fuse.search(e.target.value).slice(0, 4);

        for(const c of result.map(e => e.item)) {
            const clone = template.content.cloneNode(true);
            clone.querySelector(".councillor-list-item-title").innerText = c.title;
            clone.querySelector("button").classList.add(c.colourClass);
            clone.querySelector("button").addEventListener("click", e => {
                openCouncillorPanel(c);
            })
            resultBox.appendChild(clone);
        }
    });

    clearButton.addEventListener("click", () => {
        searchBox.value = "";
        searchBox.dispatchEvent(new Event("change"));
    })
}

export { addSearchListener }