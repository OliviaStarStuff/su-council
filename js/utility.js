class Collapsable {
    #isExpanded;
    #header;
    #indicator;
    #container;
    constructor(root, isExpanded, ) {
        this.#isExpanded = isExpanded;
        this.#header = document.getElementById(root + "-header");
        this.#indicator = document.getElementById(root + "-indicator");
        this.#container = document.getElementById(root + "-container");

        this.#header.addEventListener("click", (e) => {
            this.#container.classList.toggle("hidden", this.#isExpanded);
            this.#isExpanded = !this.#isExpanded;
            this.#indicator.textContent = this.#isExpanded ? "expand_circle_up" : "expand_circle_down";
        });

        this.#header.addEventListener("keypress", function(event) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              this.click();
            }
        });
    }

}

console.log("Utilities Loaded");
