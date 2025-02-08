import { records } from "./councilMap.js";

const captureButton = document.getElementById("capture-button");
const yearButtons = document.getElementById("year-buttons-container");
const helpButton = document.getElementById("help-button");
const container = document.querySelector("#visual-container");
const title = document.querySelector("#visual-container-title");
const result = document.querySelector("#visual-container-result");

const options = {
    "windowWidth": 1080,
    "windowheight": 800,
    // "width": 800,
    // "height": 800,
    "x": 0,
    "y": 0,
    // scrollX: 30
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
    captureButton.addEventListener("click", () => {
        const index = Councillor.list[0].voteIndex;
        const currentRecord = records[getCurrentYear()].policies[index];
        title.innerText = index > -1 ? currentRecord.name : "Su Council Visualiser";
        result.innerText = index > -1 ? currentRecord.result : "";

        let item = document.getElementById("grids");

        item.style.width = null;
        item.style.height= null;

        yearButtons.classList.add("display-hidden");
        helpButton.classList.add("display-hidden");
        captureButton.classList.add("display-hidden");

        html2canvas(document.querySelector("#visual-container"), options).then(canvas => {
            // document.body.appendChild(canvas);
            console.log(title.innerText);
            // downloadImage(canvas.toDataURL(), title.innerText);
            canvas.toBlob(blob => {
                const share = async (title, text, blob) => {
                    const data = {
                        files: [
                            new File([blob], 'file.png', {
                            type: blob.type,
                            }),
                        ],
                        title: title,
                        text: text,
                    };
                    try {
                        if (!(navigator.canShare(data))) {
                            throw new Error("Can't share data.", data);
                        }
                        await navigator.share(data);
                    } catch (err) {
                        console.error(err.name, err.message);
                    }
                };
                navigator.clipboard.write([new ClipboardItem({'image/png': blob})])
            });
        });

        title.innerText = "";
        captureButton.querySelector("p").innerText = "Copied!";
        setTimeout(resetButton, 1000);

        captureButton.classList.remove("display-hidden");
        yearButtons.classList.remove("display-hidden");
        helpButton.classList.remove("display-hidden");
    })
}

function resetButton() {
    captureButton.querySelector("p").innerText = "Copy Visual";
}

export { addCaptureButtonListener }

