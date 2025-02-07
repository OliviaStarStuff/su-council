"use strict";
import { records, sessions, generateCouncillors } from "./councilMap.js";
import { generateGroupings } from "./groupings.js";
import { populateCouncillorList } from "./councillorList.js";
import { setCouncillorClickBehaviour } from "./panel.js";
import { updateSummary } from "./summary.js";
createMessage("I am here after selector import");

const yearSelector = document.getElementById("year-buttons");
// Set up selector with all voting options
const policyList = document.getElementById("policy-list");
const panelPolicySelector = document.getElementById("panel-policy-select");
const policySelector = document.getElementById("policy-select");

const bottomPanel = document.getElementById("bottom-panel");

function generatePolicyListOptions(period) {
    const itemTemplate = document.getElementById("list-item-template");
    const headerTemplate = document.getElementById("list-header-template");

    let sessionIndex = 0;

    for(var i = 0; i<records[period].policies.length; i++) {
        const record = records[period].policies[i];
        if(record.session > sessionIndex) {
            sessionIndex = record.session;
            const header = headerTemplate.content.cloneNode(true);
            const sessionData = sessions[getCurrentYear()][sessionIndex-1];

            header.querySelector("h5").innerText = "Session " + sessionIndex;

            const minutesLink = header.querySelector(".minutes-link");
            minutesLink.href = sessionData.logs;

            const agendaLink = header.querySelector(".agenda-link");
            agendaLink.href = sessionData.agenda;

            policyList.appendChild(header);
        }

        const clone = itemTemplate.content.cloneNode(true);

        clone.querySelector("p").innerText = record.name;

        const displayPolicyButton = clone.querySelector("button");
        displayPolicyButton.value = i;
        displayPolicyButton.addEventListener("click", e => {
            selectPolicy(e, "vote-summary");
            bottomPanel.classList.remove("open");
        });

        const summaryButton = clone.querySelector("button.summary-button");
        summaryButton.value = i;
        summaryButton.addEventListener("click", displaySummary);

        const policyLink = clone.querySelector("a");
        policyLink.href = record.url;
        policyLink.disabled = record.url === "";

        policyList.appendChild(clone);
    }
}

function generatePolicySelectOptions(pSelector, period) {
    let sessionIndex = 0;
    let optGroup;

    let opt = document.createElement('option');
    opt.value = "none";
    opt.innerText = "None";
    pSelector.append(opt);

    for(var i = 0; i<records[period].policies.length; i++) {
        const record = records[period].policies[i];
        if(record.session > sessionIndex) {
            sessionIndex = record.session;
            optGroup = document.createElement('optgroup');
            optGroup.label = "Session " + sessionIndex;
            pSelector.append(optGroup);
        }

        let opt = document.createElement('option');
        opt.value = i;
        opt.innerText = record.name;
        optGroup.append(opt);
    }
}

function selectPolicy(e, summaryId) {
    // If no policy is selected, clear vote classes
    const councillors = Councillor.list;
    if(e.target.value == "none") {
        for(const c of councillors) { c.vote = -1; }
    } else {
        for(const c of councillors) { c.vote = e.target.value; }
    }
    updateSummary(e, summaryId);
    // policyList.value = e.target.value;
}

const voteSummary = document.getElementById("vote-summary")
function displaySummary(e) {
    selectPolicy(e, "vote-summary");
    policyList.classList.add("display-hidden");
    voteSummary.classList.remove("display-hidden");
}

const policy = document.getElementById("policy-outlink");
const agenda = document.getElementById("agenda-outlink");
const logs = document.getElementById("minutes-outlink");
const voteSummaryPanel = document.getElementById("vote-summary-panel");

function setupSelectors() {
    generatePolicyListOptions(getCurrentYear());
    generatePolicySelectOptions(policySelector, getCurrentYear());

    policySelector.addEventListener("change", (e) => {

        selectPolicy(e, "vote-summary-panel");

        // show or hide vote summary panel
        voteSummaryPanel.classList.toggle("display-hidden", e.target.value == "none");
        if (e.target.value == "none") return;

        // Provide urls
        const current= records[getCurrentYear()].policies[e.target.value];
        const currentSession = sessions[getCurrentYear()][currentsession - 1];

        agenda.href = currentagenda;
        logs.href = currentlogs;
        policy.href = currenturl;
        policy.disabled = currenturl == "";
    })

    policySelector.focus();

    populateCouncillorList();

    setCouncillorClickBehaviour();

    tab.addEventListener("scroll", (e) => {
        bottomPanel.classList.add("open");
        console.log("Scrolling");
    })
}

function selectYear(e) {
    Councillor.list = []
    // refresh the board
    clearChildren("council-container");
    generateCouncillors(e.target.value);

    populateCouncillorList();
    //
    // refresh the grid
    clearChildren("grids");
    generateGroupings();

    // refresh the policy selector
    clearChildren(policyList.id);
    generatePolicyListOptions(e.target.value);

    clearChildren(policySelector.id);
    generatePolicySelectOptions(policySelector, e.target.value);

    setCouncillorClickBehaviour();
    // policyList.dispatchEvent(new Event('change'))
    // hide links
    policyList.classList.remove("display-hidden");
    voteSummary.classList.add("display-hidden");
    const voteSummaryPanel = document.getElementById("vote-summary-panel");
    voteSummaryPanel.classList.add("display-hidden");
    clearChildren("vote-summary-panel-container");
}

const tab = document.getElementById("session-tab");
for (const button of yearSelector.children) {
    if (!button.disabled) {
        button.addEventListener("click", (e) => {
            for (const otherButton of yearSelector.children) {
                otherButton.classList.toggle("selected", otherButton == button)
                tab.scrollTop = 0;
            }
            selectYear(e);
        })
    }
}

function resetVotesList() {
    policyList.classList.remove("display-hidden");
    voteSummary.classList.add("display-hidden");
}

export { resetVotesList, setupSelectors }



console.log("Selector Loaded");
