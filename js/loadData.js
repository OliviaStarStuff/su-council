"use strict";
/* Written by Olivia*/
// Import Data to display
export const data = await fetch("./data/2023_2024.json").then(response => {
    return response.json()
});

console.log("Data Loaded");