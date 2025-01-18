import { records, options, councillors }  from './councilMap.js';

const voteSummary = document.getElementById("vote-summary");
const policySelector = document.getElementById("policy");

const summary = document.getElementById("summary");
summary.addEventListener

let drag = false;
const pos = {"x": 0, "y": 0};
const offsetPos = {"x": 0, "y": 0};

summary.addEventListener('mousedown', (e) => {
    drag = true
    offsetPos.x = e.clientX-pos.x;
    offsetPos.y = e.clientY-pos.y;
});

document.addEventListener('mouseup', () => {
    drag = false;
});


document.addEventListener(
    'mousemove', (e) => {
        if(drag) {
            pos.x = e.clientX - offsetPos.x;
            pos.y = e.clientY - offsetPos.y;
            summary.style.left = pos.x + "px";
            summary.style.top = pos.y + "px";
        }
});


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

policySelector.addEventListener("change", (e) => {
    // clear summary list
    while (voteSummary.firstChild) {
        voteSummary.removeChild(voteSummary.firstChild);
    }

    // guard clause if not showing voting data, show nothing
    if (e.target.value == "none") { return; }

    // Get the correct record and options
    const record = records[e.target.value];
    const targetOptions = setTargetOptions(record);

    // Set result
    const resultItem = document.createElement("li");
    setItem(resultItem, "Result", record.result);
    voteSummary.append(resultItem);

    // Set the total number of votes
    const topTotal = record.votes.filter(x => x != "No Vote" || x != "blank").length;
    const topItem = document.createElement("li");
    setItem(topItem, "Total Votes", topTotal);
    voteSummary.appendChild(topItem);

    // Display number of votes for each option
    for (const option of targetOptions) {

        const item = document.createElement("li");
        const total = record.votes.filter(x => x == option).length;

        setItem(item, option, total);
        const vote = Councillor.getVoteClass(option, targetOptions);
        item.classList.add(vote);
        voteSummary.appendChild(item);

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