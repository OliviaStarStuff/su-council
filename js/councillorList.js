import { updateMobilePanel } from "./panel.js";

createMessage("Loading CouncilList");

const template = document.getElementById("councillor-item-template");
const lists = [];
const details = document.getElementById("cllr-details");
const councillorListContainer = document.getElementById("councillor-list-container");

const collapsableRoots = ["arts", "engineering", "health", "science", "social-science",
    "specialised", "representative", "fto-pto"];

for (const root of collapsableRoots) {
    new Collapsable(root, false);
    lists.push(document.getElementById(root + "-list"))
}

function populateCouncillorList() {
    console.log("populating councillors");
    for (const list of lists) {
        clearChildren(list.id);
    }
    for(const c of Councillor.list) {
        const clone = template.content.cloneNode(true);
        clone.querySelector(".councillor-title").innerText = c.title;
        clone.querySelector("div").classList.add(c.colourClass);
        clone.querySelector("button").addEventListener("click", e => {
            openCouncillorPanel(c);
        })
        switch(c.colourClass) {
            case "member-arts-and-humanities":
                lists[0].appendChild(clone);
                break;
            case "member-engineering":
                lists[1].appendChild(clone);
                break
            case "member-health":
                lists[2].appendChild(clone);
                break
            case "member-science":
                lists[3].appendChild(clone);
                break
            case "member-social-science":
                lists[4].appendChild(clone);
                break
            case "member-su":
            case "member-specialised":
                lists[5].appendChild(clone);
                break
            case "member-representative":
                lists[6].appendChild(clone);
                break
            case "member-fto":
            case "member-pto":
                lists[7].appendChild(clone);
                break
        }
    }
}

function openCouncillorPanel(councillor) {
    details.classList.remove("display-hidden");
    councillorListContainer.classList.add("display-hidden");
    updateMobilePanel(councillor);
}

function resetCouncillor() {
    details.classList.add("display-hidden");
    councillorListContainer.classList.remove("display-hidden");
}

function addCouncillorBackButtonListener() {
    const backButton = document.getElementById("cllr-back-button");
    backButton.addEventListener("click", () => {
        details.classList.add("display-hidden");
        councillorListContainer.classList.remove("display-hidden");
    })
}

export { populateCouncillorList, openCouncillorPanel, resetCouncillor, addCouncillorBackButtonListener }
