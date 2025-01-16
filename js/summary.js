import { records, options }  from './councilMap.js';

const summaryText = document.getElementById("vote-summary");

const policySelector = document.getElementById("policy");

policySelector.addEventListener("change", (e) => {
    if (e.target.value != "none") {
        const targetRecord = records[e.target.value];
        let entries = []
        let targetOptions;
        if (targetRecord.style == "custom") {
            targetOptions = targetRecord.options
        } else {
            targetOptions = options[targetRecord.style];
        }
        for (const option of targetOptions) {
            let temp = "";
            temp += option + ": ";
            temp += targetRecord.record.filter(x => x == option).length;
            temp += " ";
            entries.push(temp);
        }
        summaryText.innerText = entries.join(" ");
    }
})