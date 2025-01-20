"use strict";
/* Written by Olivia*/
// Import Data to display
export const data = await fetch("./js/councillors.json").then(response => {
    return response.json()
});
console.log("Data Loaded");