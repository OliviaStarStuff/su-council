class Collapsable {
    #isExpanded;
    #header;
    #indicator;
    #container;
    #graphics = {"up": "expand_circle_up", "down": "expand_circle_down"};

    constructor(root, isExpanded, graphics) {
        this.#isExpanded = isExpanded;
        this.#header = document.getElementById(root + "-header");
        this.#indicator = document.getElementById(root + "-indicator");
        this.#container = document.getElementById(root + "-container");
        this.#container.classList.add("collapsable-container")

        this.#indicator.textContent = this.indicatorGraphic;
        if(graphics!=undefined) { this.#graphics = graphics; }

        this.#header.addEventListener("click", (e) => {
            this.#container.classList.toggle("hidden", this.#isExpanded);
            // this.#container.classList.toggle("display-hidden", this.#isExpanded);
            this.#isExpanded = !this.#isExpanded;
            this.#indicator.textContent = this.indicatorGraphic;
        });

        this.#header.addEventListener("keypress", function(event) {
            if (event.key === "Enter" || event.key === " ") {
                // prevent default allows it to slide
                event.preventDefault();
                this.click();
            }
        });
    }

    get indicatorGraphic() {
        return !this.#isExpanded ? this.#graphics.up : this.#graphics.down
    }
}

function clearChildren(parentClassName) {
    const parentClass = document.getElementById(parentClassName);
    while(parentClass.firstChild) {
        parentClass.removeChild(parentClass.firstChild);
    }
}

function sanitiseName(name) {
    return name.toLowerCase().replace(" & ", "-and-").replace(" ", "-");
}

function getCurrentYear() {
    const yearSelector = document.getElementById("year-buttons")
    for(const button of yearSelector.children) {
        if (button.classList.contains("selected")) { return button.value; }
    };
}

function generateDataExport(data, attribute) {
    const recordOutput = {};
    for (const key in data) {
        recordOutput[key] = data[key][attribute];
    }
    return recordOutput;
}

function createMessage(text) {
    const header = document.getElementById("header");
    const p = document.createElement("p");
    header.appendChild(p);
    p.innerText = text;
}

// console.log("Utilities Loaded");
