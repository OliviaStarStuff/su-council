/* Written by Olivia*/
// Import Data to display
console.log("Load data");
export const data = await fetch("./js/councillors.json").then(response => {
    return response.json()
});