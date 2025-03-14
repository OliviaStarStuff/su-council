"use strict";

// Does not work with firefox 15/01/2025
// import data from './councillors.json' with { type: 'json' };
import { data } from "./loadData.js"
import { bioData } from "./firestore.js";
// const councillors = []
// export const records = data.records;
// export const groups = data.groups;

function generateDataExport(attribute) {
    const recordOutput = {};
    for (const key in data) {
        recordOutput[key] = data[key][attribute];
    }
    return recordOutput;
}

const groups = generateDataExport("groups");
const records = generateDataExport("records");
const sessions = generateDataExport("sessions");

// createMessage("council map load complete");
// createMessage(Object.keys(groups["2023/2024"]).length);
// createMessage(Object.keys(sessions["2023/2024"]).length);

// We'll add all councillor objects to this section
const councilMap = document.getElementById('council-container');
// These are overlay hooks
const tooltip = document.getElementById('overlay');
const tooltipRole = document.getElementById('overlay-role');
const tooltipType = document.getElementById('overlay-type');
const tooltipVote = document.getElementById('overlay-vote');

// Generate all councillors
function generateCouncillors(fromYear) {
    let i = 0;
    // {"state", "period", "people", "councillors", "records", "groups"}
    const fromData = data[fromYear];
    Vote.styles = fromData.records.options;
    councilMap.setAttribute("aria-label",
            `There are ${fromData.councillors.length} councillors arranged in the shape of a hexagon`);

    for(const cData of fromData.councillors) {
        cData.history = [];

        // set voting history
        for (const record of fromData.records.policies) {
            const vote = record.votes[i] == "No Vote" ? "Absent" : record.votes[i];
            cData.history.push({
                "name": record.name,
                "style": record.style,
                "vote": vote,
                "session": record.session,
                "isProxy": cData.proxiedFor ? cData.proxiedFor.includes(record.session) : false
            });
        };

        const foundData = bioData.filter(x => x.id == i && x.period == fromYear)
        const c = new Councillor(cData, foundData[0]);

        // set attributes of node
        c.node.setAttribute("tabindex", 0);
        c.node.setAttribute("role", "graphics-symbol");
        let an = "a"
        let definite = ` from the faculty of ${c.faculty}`
        switch(c.faculty) {
            case "Arts & Humanities":
            case "Engineering":
                an = "an";
                break;
            case "SU":
                an = "an";
                definite = "from the SU";
                break;
            case "AMRC":
            case "Apprentice":
            case "Foundation":
                definite = "";
                break;
        }
        c.node.setAttribute("aria-label", `${c.title}, ${an} ${c.type} `
                          + `councillor ${definite} at axial `
                          + `coordinates, q: ${c.coords[0]}, r:${c.coords[1]}`)
        c.node.setAttribute("tabindex", 0);

        const toggleNames = document.getElementById("toggle-names");
        switch(c.type) {
            case "Academic":
            case "Specialised":
            case "PGR":
                c.initial = !toggleNames.checked;
                break;
        }

        c.index = i;
        i++;

        // could use user agent instead to detect if on mobile
        if (window.innerWidth > 600) {
            c.node.addEventListener("pointerover", (e) => {
                tooltipRole.innerText = c.title;
                tooltipType.innerText = "Type: " + c.type + ", Faculty: " + c.faculty;

                // Set vacant status
                if(c.isCurrentlyVacant) {
                    tooltipVote.innerText = "Vacant";
                } else {
                    const voteStatus = c.isVoteProxied ? " (proxied)" : "";
                    tooltipVote.innerText = c.vote + voteStatus;
                }
                tooltip.classList.remove("display-hidden");
                tooltip.classList.add(c.colourClass);
            })

            c.node.addEventListener("pointerout", (e) => {
                tooltip.classList.add("display-hidden");
                tooltip.classList.remove(c.colourClass);
            })

            c.node.addEventListener("pointerenter", (e) => {
                tooltip.classList.remove("display-hidden");
                tooltip.classList.add(c.colourClass);
                tooltip.style.left = e.pageX + 10 + "px";
                tooltip.style.top = e.pageY + 20 + "px";
            })
        }

        Councillor.list.push(c);
        councilMap.appendChild(c.node);
    }
}

// generateCouncillors(getCurrentYear());


const vc = document.getElementById("hexagon");
function addOverlayListener() {
    vc.addEventListener("pointermove", (e) => {
        tooltip.style.left = e.pageX + 10 + "px";
        if(window.innerHeight-e.clientY > 130) {
            tooltip.style.removeProperty("bottom")
            tooltip.style.top = e.pageY + 0 + "px";
        } else {
            const diff = window.innerHeight-e.clientY;
            tooltip.style.removeProperty("top")
            tooltip.style.bottom = 0;
        }
    })
}
// const visualisation = document.getElementById("visualisation");

// let drag = false;
// const pos = {"x": 0, "y": 0};
// const offsetPos = {"x": 0, "y": 0};

// visualisation.addEventListener('pointerdown', (e) => {
//     drag = true
//     offsetPos.x = e.clientX-pos.x;
//     offsetPos.y = e.clientY-pos.y;
// });

// document.addEventListener('pointerup', () => {
//     drag = false;
// });

// document.addEventListener('pointermove', (e) => {
//         if(drag) {
//             pos.x = e.clientX - offsetPos.x;
//             pos.y = e.clientY - offsetPos.y;
//             visualisation.style.left = pos.x + "px";
//             visualisation.style.top = pos.y + "px";
//         }
// });

// for (let q = -gs+1; q < gs; q++) {
//     const r_start = q < 0 ? -gs-q : -gs;
//     const r_end = q < 0 ? gs : gs-q;
//     for(let r = r_start; r < r_end-1; r++) {
//         console.log(q, r);
//         const councilor = new Councillor(false, q, r, "member-pto");
//         section.append(councilor.getNode());
//     }
// }

// const records = Record.records;
// const sessions = Session.sessions;

export {records, groups, sessions, generateCouncillors, addOverlayListener}

console.log("councilMap Loaded");