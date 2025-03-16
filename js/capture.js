import { records } from "./councilMap.js";
import { VoteSummary } from "./summary.js";

const captureButton = document.getElementById("capture-button");
const template = document.getElementById("legend-row-template");

const options = {
    "windowWidth": 1120,
    "windowheight": 800,
    "width": 800,
    "height": 800,
    "scale": 1.25,
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

function checkMobile() {

    let check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
}

function addCaptureButtonListener() {
    const textContainer = document.querySelector("#visual-container-description");
    const title = document.querySelector("#visual-container-title");

    const councillorTotal = document.querySelector("#visual-container-councillor-total");
    const councillorOccupied = document.querySelector("#visual-container-councillor-occupied");
    const councillorVacant = document.querySelector("#visual-container-councillor-vacant");
    const present = document.querySelector("#visual-container-councillor-present");
    const absent = document.querySelector("#visual-container-councillor-absent");

    const totalVotes = document.querySelector("#visual-container-result-total");
    const abstain = document.querySelector("#visual-container-result-abstain");
    const threshold = document.querySelector("#visual-container-result-threshold");
    const result = document.querySelector("#visual-container-result");
    const period = document.querySelector("#visual-container-result-period");
    const session = document.querySelector("#visual-container-result-session");

    const bottomRightContainer = document.querySelector("#visual-container-bottom-right");

    const yearButtons = document.getElementById("year-buttons-container");
    const helpButton = document.getElementById("help-button");
    textContainer.classList.add("display-hidden");
    // textContainer.classList.remove("display-hidden");

    captureButton.addEventListener("click", () => {
        // Set text
        // const currentRecord = records[getCurrentYear()].policies[index];
        if(Councillor.list[0].voteIndex <= -1) {
            title.innerText = "Su Council Visualiser";
            result.innerText = "";
        } else {

            title.innerText = VoteSummary.name;

            session.innerText = `${getCurrentYear()} Session ${VoteSummary.session} - Seats: ${Councillor.list.length}`;
            // councillorTotal.innerText = `Total Seats: ${Councillor.list.length}`;
            // councillorOccupied.innerText = `Occupied Seats: ${VoteSummary.occupiedSeats}`;
            // councillorVacant.innerText = `Vacant: ${VoteSummary.vacant}`;
            councillorTotal.innerText = `Occupied/Vacant: ${VoteSummary.occupiedSeats} / ${VoteSummary.vacant}`;
            present.innerText = `Present: ${VoteSummary.occupiedSeats - VoteSummary.absent}`;
            absent.innerText = `Absent: ${VoteSummary.absent}`;

            totalVotes.innerText = `Total Votes: ${VoteSummary.total}`;
            // abstain.innerText = `Abstain: ${VoteSummary.breakdown["Abstain"]}`;
            if (VoteSummary.style == "standard") {
                const recordType = VoteSummary.isSuperMajority() ? "Super Majority" : "Simple Majority";
                threshold.innerText = `${recordType}: ${VoteSummary.threshold}`;
            } else {
                threshold.innerText = `Quota: ${VoteSummary.quota}`;
            }
            result.innerText = `Result: ${VoteSummary.result}`;
            if (!VoteSummary.isPassed() && VoteSummary.result == "Passed") {
                result.innerText = `Result: Passed but shouldn't have`
            }

            clearChildren(bottomRightContainer.id);
            for(const [key, value] of Object.entries(VoteSummary.breakdown)) {
                if (key == "Absent") { continue; }

                const row = template.content.cloneNode(true);
                const p = row.querySelector(".legend-row-title");
                const p2 = row.querySelector    (".legend-row-value");
                const icon = row.querySelector(".fa-solid");
                p.innerText = `${key}: `;
                p2.innerText = `${value}`;
                icon.classList.add(Vote.getClass(key, VoteSummary.style));
                if ((key =="Abstain" ||  key =="Blank") && VoteSummary.style != "standard") {
                    bottomRightContainer.insertBefore(row, bottomRightContainer.firstChild);
                } else {
                    bottomRightContainer.appendChild(row);
                }
            }
        }
        // period.innerText = getCurrentYear();

        // Hide bits we don't want to see
        // maybe we should iterate over a class
        yearButtons.classList.add("display-hidden");
        helpButton.classList.add("display-hidden");
        captureButton.classList.add("display-hidden");
        textContainer.classList.remove("display-hidden");

        const viewport = document.querySelector("#visual-container");
        const hexagon = document.querySelector("#hexagon");
        viewport.style.width = "800px";
        viewport.style.height = "800px";
        viewport.style.setProperty('--scale', '1');
        html2canvas(viewport, options).then(canvas => {
            // comment out before push
            // document.body.appendChild(canvas)
            if(checkMobile()) {
                downloadImage(canvas.toDataURL(), title.innerText);
            }
            try {
                canvas.toBlob(blob => {
                    navigator.clipboard.write([new ClipboardItem({'image/png': blob})])
                });
            } catch(err) {
                console.err(err);
            }
        });


        captureButton.querySelector("p").innerText = "Copied!";
        setTimeout(resetButton, 1000);
        viewport.style.width = null;
        viewport.style.height = null;
        viewport.style.removeProperty("--scale");
        captureButton.classList.remove("display-hidden");
        yearButtons.classList.remove("display-hidden");
        helpButton.classList.remove("display-hidden");
        textContainer.classList.add("display-hidden");

    })
}

function resetButton() {
    captureButton.querySelector("p").innerText = "Copy Visual";
}

export { addCaptureButtonListener }

