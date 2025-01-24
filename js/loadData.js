"use strict";
/* Written by Olivia*/
// Import Data to display
const data2023 = await fetch("./data/2023_2024.json").then(response => {
    return response.json()
});

const data2024 = await fetch("./data/2024_2025.json").then(response => {
    return response.json()
});

export const data = { "2023/2024": data2023, "2024/2025": data2024 }

console.log("Data Loaded");

const search = "^(FOR|NO VOTE|ABSTAIN|AGAINST|)\n";
const replace = '                "$1",\n';