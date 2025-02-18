"use strict";

import { openCouncillorPanel } from "./councillorList.js"
import { records } from "./councilMap.js";
import { createPolicyItem } from "./selector.js";

// c for councillor
function createCouncillorItem(c) {
    const template = document.getElementById("councillor-item-template");
    const clone = template.content.cloneNode(true);
    clone.querySelector(".councillor-list-item-title").innerText = c.title;
    clone.querySelector(".councillor-list-item-name").innerText = c.bio.name;
    clone.querySelector("button").classList.add(c.colourClass);
    clone.querySelector("button").addEventListener("click", e => {
        openCouncillorPanel(c);
    })
    return clone;
}

class Search {
    #fuse;
    #input;
    #clearButton;
    #result;
    #options;
    constructor(root, searchlist, options, createItem) {
        this.#options = options;
        this.#fuse = new Fuse(searchlist, options);

        const rootNode = document.getElementById(root + "-search-container");
        const list = document.getElementById(root + "-list");
        this.#input = rootNode.querySelector("input");
        this.#result = document.getElementById(root + "-search-results");
        this.#clearButton = rootNode.querySelector("button");
        this.#input.addEventListener("change", (e) => {
            clearChildren(this.#result.id)
            if (e.target.value == "") {
                list.classList.remove("display-hidden");
                return;
            };
            list.classList.add("display-hidden");
            const result = this.#fuse.search(e.target.value).slice(0, 4);

            for(const c of result.map(e => e.item)) {
                this.#result.appendChild(createItem(c));
            }
        });


        this.#clearButton.addEventListener("click", () => {
            this.#input.value = "";
            this.#input.dispatchEvent(new Event("change"));
        })
    }

    set searchList(list) {
        this.#fuse = new Fuse(list, this.#options);
        this.#input.dispatchEvent(new Event("change"));
    }
}

function addSearchListener() {
    const councillorOptions = {
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
            {
                name: 'bio.name',
                weight: 2
            },
            "initial",
            "faculty",
            "type"
        ]
    };

    const policyOption = {
        // threshold: 0.4,
        keys: [
            "name",
            "type"
        ]
    };

    const councillorSearch = new Search("councillor", Councillor.list,
            councillorOptions, createCouncillorItem)

    const policySearch = new Search("policy", records[getCurrentYear()].policies,
        policyOption, createPolicyItem)

    const yearSelector = document.getElementById("year-buttons");
    for (const button of yearSelector.children) {
        if (!button.disabled) {
            button.addEventListener("click", (e) => {
                councillorSearch.searchList = Councillor.list;
                policySearch.searchList = records[getCurrentYear()].policies;
            })
        }
    }
}

export { addSearchListener }