import { records, options, councillors }  from './councilMap.js';

// Summary Window draggable feature
const summary = document.getElementById("summary");

let drag = false;
const pos = {"x": 0, "y": 0};
const offsetPos = {"x": 0, "y": 0};
summary.addEventListener('pointerdown', (e) => {
    drag = true
    offsetPos.x = e.clientX-pos.x;
    offsetPos.y = e.clientY-pos.y;
});

document.addEventListener('pointerup', () => {
    drag = false;
});

document.addEventListener('pointermove', (e) => {
        if(drag) {
            pos.x = e.clientX - offsetPos.x;
            pos.y = e.clientY - offsetPos.y;
            summary.style.left = pos.x + "px";
            summary.style.top = pos.y + "px";
        }
});


// contractable summary tab
const voteSummaryHeader = document.getElementById("vote-summary-header");
const voteSummaryIndicator = document.getElementById("vote-summary-indicator");
const voteSummaryDetails = document.getElementById("vote-summary-details");

let summaryIsExpanded = false;
voteSummaryHeader.addEventListener("click", (e) => {
    voteSummaryIndicator.textContent = summaryIsExpanded ? "contract" : "expand";
    summaryIsExpanded = !summaryIsExpanded;
    voteSummaryDetails.classList.toggle("hidden");
})


// contractable options tab
const togglesHeader = document.getElementById("toggles-header");
const togglesIndicator = document.getElementById("toggles-indicator");
const togglesOptions = document.getElementById("toggles-options");

let togglesIsExpanded = false;
togglesHeader.addEventListener("click", (e) => {
    togglesIndicator.textContent = togglesIsExpanded ? "contract" : "expand";
    togglesIsExpanded = !togglesIsExpanded;
    togglesOptions.classList.toggle("hidden");
})

// utility functions to generate summary values
function setTargetOptions(record) {
    if (record.style == "custom") { return record.options; }

    return options[record.style];
}

function setItem(item, option, totalValue) {
    const optionText = document.createElement("p");
    optionText.innerText  = option + ": ";

    const total = document.createElement("p");
    total.innerText = totalValue;
    item.appendChild(optionText);
    item.appendChild(total);
}

const policySelector = document.getElementById("policy");
const voteSummary = document.getElementById("vote-summary");

policySelector.addEventListener("change", (e) => {
    // clear summary list
    while (voteSummaryDetails.firstChild) {
        voteSummaryDetails.removeChild(voteSummaryDetails.firstChild);
    }

    // guard clause if not showing voting data, show nothing
    voteSummary.classList.toggle("hidden", e.target.value == "none");
    if (e.target.value == "none") { return; }

    // Get the correct record and options
    const record = records[e.target.value];
    const targetOptions = setTargetOptions(record);

    // Set result
    const resultItem = document.createElement("div");
    setItem(resultItem, "Result", record.result);
    voteSummaryDetails.appendChild(resultItem);

    // Set the total number of votes
    const topItem = document.createElement("div");
    const topTotal = record.votes.filter(x => x != "No Vote" && x != "blank" && x != "").length;
    setItem(topItem, "Total Votes", topTotal);
    voteSummaryDetails.appendChild(topItem);

    // Display number of votes for each option
    for (const option of targetOptions) {

        const item = document.createElement("div");
        var total = 0;
        // this sketchy work around is done because there are some
        // non vacant positions that have a vote entry
        // as "" instead of "No Vote". what does that mean?
        /* todo: find out */
        if (option == "No Vote") {
            for (const c of councillors) {
                if (c.vote == "Absent") {
                    total += 1;
                }
            }
        } else {
            total = record.votes.filter(x => x == option).length;
        }
        setItem(item, option, total);
        const vote = Councillor.getVoteClass(option, targetOptions);
        item.classList.add(vote);
        voteSummaryDetails.appendChild(item);

        // Add interactions for mouseover and mouseout to highlight similar votes
        item.addEventListener("mouseover", (e) =>  {
            for (const c of councillors) {
                const node = c.getNode();
                node.classList.toggle("vote-hidden", !node.classList.contains(vote));
            }
        })

        item.addEventListener("mouseout", (e) =>  {
            for (const c of councillors) {
                const node = c.getNode();
                node.classList.remove("vote-hidden");
            }
        })
    }
})

const policyStatus = document.getElementById("vote-Status");