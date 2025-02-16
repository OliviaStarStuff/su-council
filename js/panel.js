// const button = document.getElementById("cllr-panel-close-button");


// fill details
const panelTitle = document.getElementById("cllr-panel-title");
const recordTableBody = document.getElementById("cllr-record-body");

var bioSheet = 'https://docs.google.com/spreadsheets/d/1prdcSBqtElLL69KtSkQpQ-WCFnzxP1MmPfLoIbR_Enw/edit?gid=0#gid=0';

import { records } from "./councilMap.js"

createMessage("Loading panel");

const details = document.getElementById("cllr-details");
const councillorButton = document.getElementById("nav-councillors");
function setCouncillorClickBehaviour() {
    const councillorListContainer = document.getElementById("councillor-list-container");
    for(const councillor of Councillor.list) {
        councillor.node.addEventListener("click", (e) => {
            updateMobilePanel(councillor);
            councillorButton.click();
            councillorListContainer.classList.add("display-hidden");
            details.classList.remove("display-hidden");
            console.log("councilor clicked!");
        })
    }
}

function updateMobilePanel(councillor) {

    updatePanel(councillor);

    // clear vote history table;
    while(recordTableBody.firstChild) {
        recordTableBody.removeChild(recordTableBody.firstChild);
    }

    // populate vote history table;
    let i = 0
    const currentPolicies = records[getCurrentYear()].policies;
    for(const r of councillor.history) {
        i++;
        if (r.vote == "") { continue; }
        createHistoryRow(r, i, currentPolicies[i-1].url);
    }
    // vacantContainer.classList.add("display-hidden")
}


const bioName = document.getElementById("info-bio-name");
const bioPronouns = document.getElementById("info-bio-pronouns");
const bioDegree = document.getElementById("info-bio-degree");
const bioYear = document.getElementById("info-bio-year");
const manifesto = document.getElementById("manifesto");
const emailLink = document.getElementById("cllr-panel-contact-link");
const socialContainer = document.getElementById("cllr-panel-socials")
const expandTab = document.getElementById("expand-tab")

// var compilerInfoTemplate = Handlebars.compile($('#info-template').html());

const classes = ["fto", "pto", "representative", "specialised",
    "health", "arts-and-humanities", "social-science",
    "science", "engineering"]

function updatePanel(councillor) {
    details.className = "";
    expandTab.className = "expand-tab";
    socialContainer.classList.add("display-hidden");
    details.querySelector("img").removeAttribute("src");

    if (councillor.bio.picture) {
        details.querySelector("img").src = councillor.bio.picture;
    } else {
        details.querySelector("img").src = "./img/defaultImage.webp";
    }
    details.classList.add(councillor.colourClass);
    expandTab.classList.add(councillor.colourClass);
    panelTitle.innerText = councillor.title;


    // $('#info-bio').sheetrock({
    //     url: bioSheet,
    //     query: "select B,C,D,E,F,G where A = " + councillor.id,
    //     fetchSize: 1,
    //     rowTemplate: compilerInfoTemplate,
    //     callback: function (error, options, response) {
    //         console.log(response.rows);
    //     }
    //   })
    bioName.innerText = councillor.bio.name;
    bioYear.innerText = councillor.bio.year;
    bioPronouns.innerText = councillor.bio.pronouns;
    bioDegree.innerText = councillor.bio.degree;
    emailLink.href = "mailto:" + councillor.bio.email;

    let splitLines = councillor.bio.manifesto.split("\n");
    if (splitLines.length == 1) {
        splitLines = councillor.bio.manifesto.split("\\n")
    }
    console.log(splitLines)
    clearChildren(manifesto.id)
    for(const line of splitLines) {
        console.log(line);
        const p = document.createElement('p');
        p.innerText = line;
        manifesto.appendChild(p);
        // manifesto.innerText = councillor.bio.manifesto;
    }
    if (councillor.bio.socials) {
        clearChildren(socialContainer.id);
        socialContainer.classList.remove("display-hidden");
        for(const [key, value] of Object.entries(councillor.bio.socials)) {
            const socialLink = document.createElement("a");
            socialLink.href = value;
            socialLink.innerText = key;
            socialLink.id = `bio-social-${key}-link`
            socialContainer.appendChild(socialLink);
        }
    }

}

const rowTemplate = document.getElementById("record-table-row-template");
const policySelector = document.getElementById("policy-select");
function createHistoryRow(record, index, url) {
    const clone = rowTemplate.content.cloneNode(true);
    const voteTitleCell = clone.querySelector("a");
    voteTitleCell.innerText = record.name;
    voteTitleCell.href = url;
    voteTitleCell.disabled = url == "";

    const voteCell = clone.querySelector("button");
    voteCell.classList.add(Vote.getClass(record.vote, record.style));
    voteCell.innerText = record.vote;
    voteCell.addEventListener("click", (e) => {
        policySelector.selectedIndex = index;
        policySelector.dispatchEvent(new Event("change"))
    })

    recordTableBody.appendChild(clone);
}

const detailSelector = document.getElementById("cllr-details-buttons");
// const tab = document.getElementById("record-table-container");
for (const button of detailSelector.children) {
    if (!button.disabled) {
        button.addEventListener("click", (e) => {
            for (const otherButton of detailSelector.children) {
                otherButton.classList.toggle("selected", otherButton == button)
                // tab.scrollTop = 0;
                const otherId = otherButton.id.replace("button", "container");
                const otherButtonTab = document.getElementById(otherId);
                otherButtonTab.classList.toggle("display-hidden", otherButton != button)
            }
        })
    }
}

export { setCouncillorClickBehaviour, updateMobilePanel }

console.log("Panel Loaded");
