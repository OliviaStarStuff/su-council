"use strict"

const nav = document.getElementById("main-nav");
const pages = document.getElementsByClassName("page-content");

createMessage("Loading CouncilNav");

const currentYear = getCurrentYear()

function setPageAsVisible(page, pages) {
    for (const p of pages) {
        p.classList.toggle("display-hidden", p != page);
    }
}

function addMainNavEventListener() {
    for (let i = 0; i < nav.children.length; i++) {
        nav.children[i].addEventListener("click", e => {
            setPageAsVisible(pages[i], pages);

            for (const button of nav.children) {
                button.classList.toggle("selected", button == nav.children[i]);
            }
        });
    }
}

export { addMainNavEventListener }