const button = document.getElementById("capture-button");
function addCaptureButtonListener() {
        button.addEventListener("click", () => {
        var svgElements = document.body.querySelectorAll('svg');
        svgElements.forEach(function(item) {
            item.setAttribute("width", item.getBoundingClientRect().width);
            item.setAttribute("height", item.getBoundingClientRect().height);
            item.style.width = null;
            item.style.height= null;
        });
        console.log("clicked button")
        html2canvas(document.querySelector("#council-page")).then(canvas => {
            document.body.appendChild(canvas)
        });
    })
}

export { addCaptureButtonListener }

