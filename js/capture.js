import { records } from "./councilMap.js";

const button = document.getElementById("capture-button");
const yearButtons = document.getElementById("year-buttons-container");
const helpButton = document.getElementById("help-button");
const container = document.querySelector("#visual-container");
const title = document.querySelector("#visual-container-title");
const result = document.querySelector("#visual-container-result");

const options = {
    "windowWidth": 1024,
    "windowheight": 800,
}

function downloadImage(uri, filename) {
    let name = "SU Council Visualiser_" + getCurrentYear();
    if (filename != "") {
        name += "_" + filename.replaceAll(" ", "_")
    }
    const link = document.createElement('a');
    link.href = uri;
    console.log(name);
    link.download = name;

    //Firefox requires the link to be in the body
    document.body.appendChild(link);

    //simulate click
    link.click();
    document.body.removeChild(link);
}

function addCaptureButtonListener() {
    title.innerText = "";
    result.innerText = "";
    button.addEventListener("click", () => {
        const index = Councillor.list[0].voteIndex;
        const currentRecord = records[getCurrentYear()].policies[index];
        title.innerText = index > -1 ? currentRecord.name : "Su Council Visualiser";
        result.innerText = index > -1 ? currentRecord.result : "";

        let item = document.getElementById("grids");
        // item.setAttribute("left", 700/2 + "px");
        // item.setAttribute("top", 745/2 + "px");
        // item.setAttribute("width", 700);
        // item.setAttribute("height", 745);
        item.style.width = null;
        item.style.height= null;
        // item.style.top = null;
        // item.style.left= null;
        yearButtons.classList.add("display-hidden");
        helpButton.classList.add("display-hidden");
        button.classList.add("display-hidden");
        container.style.setProperty("width", "800px");
        container.style.setProperty("height", "800px");
        // container.style.setProperty("--scale", "1");
        // container.style.setProperty("height", "100%");
        html2canvas(document.querySelector("#visual-container"), options).then(canvas => {
            // document.body.appendChild(canvas);
            console.log(title.innerText);
            downloadImage(canvas.toDataURL(), title.innerText);
            title.innerText = "";
        });
        container.style.removeProperty("width");
        container.style.removeProperty("height");
        yearButtons.classList.remove("display-hidden");
        helpButton.classList.remove("display-hidden");
        button.classList.remove("display-hidden");
    })
}

export { addCaptureButtonListener }

