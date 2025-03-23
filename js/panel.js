// const button = document.getElementById("cllr-panel-close-button");


// fill details
const panelTitle = document.getElementById("cllr-panel-title");
const recordTableBody = document.getElementById("cllr-record-body");

var bioSheet = 'https://docs.google.com/spreadsheets/d/1prdcSBqtElLL69KtSkQpQ-WCFnzxP1MmPfLoIbR_Enw/edit?gid=0#gid=0';

import { records } from "./councilMap.js"
import { selectYear } from "./selector.js"

createMessage("Loading panel");

let SelectedCouncillor;

function clearSelectedCouncillor() {
    if(SelectedCouncillor) {
        SelectedCouncillor.classList.remove("selected");
        SelectedCouncillor = undefined;
    }
}

const details = document.getElementById("cllr-details");
const councillorButton = document.getElementById("nav-councillors");
function setCouncillorClickBehaviour() {
    const councillorListContainer = document.getElementById("councillor-list-container");
    for(const councillor of Councillor.list) {
        councillor.node.addEventListener("click", (e) => {
            councillorButton.click();
            updateMobilePanel(councillor);

            // if(SelectedCouncillor) {
            //     SelectedCouncillor.classList.remove("selected");
            // }
            // SelectedCouncillor = councillor;
            // councillor.classList.add("selected");s

            councillorListContainer.classList.add("display-hidden");
            details.classList.remove("display-hidden");
        })
    }
}

function updateMobilePanel(councillor) {

    const rootNode = document.getElementById("councillor-search-container");
    const clearButton = rootNode.querySelector("button");
    clearButton.click();

    updatePanel(councillor);

    // clear vote history table;
    while(recordTableBody.firstChild) {
        recordTableBody.removeChild(recordTableBody.firstChild);
    }

    // populate vote history table;
    let i = 0
    const currentPolicies = records[getCurrentYear()].policies;
    let currentSession = -1;
    for(const r of councillor.voteHistory) {
        i++;
        if (r.vote == "") { continue; }
        if (currentPolicies[i-1].session > currentSession) {
            createSessionRow(currentPolicies[i-1].session);
            currentSession = currentPolicies[i-1].session;
        }
        createHistoryRow(r, i, currentPolicies[i-1].url);
    }
    // vacantContainer.classList.add("display-hidden")
}

function createSessionRow(sessionNum) {
    const rowTemplate = document.getElementById("record-table-session-row-template");
    console.log(rowTemplate)
    const clone = rowTemplate.content.cloneNode(true);
    clone.querySelector("td").innerText = `Session ${sessionNum}`;
    recordTableBody.appendChild(clone);
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

const career = document.getElementById("career");

const classes = ["fto", "pto", "representative", "specialised",
    "health", "arts-and-humanities", "social-science",
    "science", "engineering"]

const yearSelector = document.getElementById("year-buttons");
// const newLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
// document.getElementById("full-svg").append(newLine);
function updatePanel(councillor) {
    // reset panel UI
    details.className = "";
    expandTab.className = "expand-tab";
    socialContainer.classList.add("display-hidden");
    details.querySelector("img").removeAttribute("src");

    // Set picture
    if (councillor.bio.picture) {
        details.querySelector("img").src = councillor.bio.picture;
    } else {
        details.querySelector("img").src = "./img/defaultImage.webp";
    }

    // Set faculty colour and councillor title
    details.classList.add(councillor.colourClass);
    expandTab.classList.add(councillor.colourClass);
    panelTitle.innerText = councillor.title.replace(" (x2)","");

    // Set bio info
    // sheetrock was a potential explored way of doing it that isn't used
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
    bioYear.innerText = councillor.bio.year + " Year";
    bioPronouns.innerText = councillor.bio.pronouns;
    bioDegree.innerText = councillor.bio.degree;
    emailLink.href = "mailto:" + councillor.bio.email;

    // Manifesto
    let splitLines = councillor.bio.manifesto.split("\n");
    if (splitLines.length == 1) {
        splitLines = councillor.bio.manifesto.split("\\n")
    }
    clearChildren(manifesto.id)
    for(const line of splitLines) {
        const p = document.createElement('p');
        p.innerText = line;
        manifesto.appendChild(p);
        // manifesto.innerText = councillor.bio.manifesto;
    }

    // Councillor socials
    if (councillor.bio.socials) {
        clearChildren(socialContainer.id);
        socialContainer.classList.remove("display-hidden");
        for(const [key, value] of Object.entries(councillor.bio.socials)) {
            if (value) {
                const socialLink = document.createElement("a");
                socialLink.href = value;
                socialLink.innerText = key;
                socialLink.id = `bio-social-${key}-link`
                socialContainer.appendChild(socialLink);
            }
        }
    }

    clearChildren(career.id)
    if (councillor.career.length == 0) {
    } else {
        const careerTitle = document.createElement('h3');
        careerTitle.innerText = "Previous Positions";
        careerTitle.classList.add ("career-title")
        career.appendChild(careerTitle);

        for(const item of councillor.career) {
            const period = document.createElement('p');
            period.innerText = item.period;

            const careerTitleButton = document.createElement('button');
            careerTitleButton.innerText = item.position;
            careerTitleButton.value = item.period

            career.appendChild(period);
            career.appendChild(careerTitleButton);

            careerTitleButton.addEventListener("click", (e) => {
                for (const button of yearSelector.children) {
                    if(button.innerText == item.period) {
                        button.click();
                        selectYear(e);
                        updateMobilePanel(Councillor.list[item.id])
                        break;
                    }
                }
            })
        }
    }
    // const topContainer = document.getElementById("bottom-panel");
    // const pt1 = topContainer.getBoundingClientRect()
    // const pt2 = councillor.node.getBoundingClientRect()
    // console.log(pt2)
    // console.log(pt2.x, pt2.y, councillor.position)
    // newLine.setAttribute('id', 'line1');
    // newLine.setAttribute('x1', pt1.left);
    // newLine.setAttribute('y1', pt1.top + 50);
    // newLine.setAttribute('x2', pt2.x + 20);
    // newLine.setAttribute('y2', pt2.y + 20);
    // newLine.setAttribute('style', 'stroke: black; stroke-width: 2;');
    // const svg = document.getElementById("full-svg");

}
const span = document.createElement("span");
span.title = "proxied";
span.innerText = "(p)";
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
    const voteStatus = record.isProxy ? " " : "";
    voteCell.innerText = record.vote + voteStatus;
    if (voteStatus) {
        const span = document.createElement("span");
        span.title = "proxied";
        span.innerText = "(p)";
        voteCell.appendChild(span.cloneNode(true));
    }

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

export { setCouncillorClickBehaviour, updateMobilePanel, clearSelectedCouncillor }

console.log("Panel Loaded");
