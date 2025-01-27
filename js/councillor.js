"use strict";

class Hex {
    #coords;
    #size;
    constructor(coords, size=[20, 20]) {
        this.#coords = coords;
        this.#size = size;
    }

    get position() {
        const pos = [
            Hex.getLeft(this.#coords)-this.#size[0],
            Hex.getTop(this.#coords)-this.#size[1]
        ]
        return pos;
    }

    get coords() { return this.#coords; }
    set coords(coords) {
        this.#coords.q = coords.q;
        this.#coords.r = coords.r;
    }

    set moveX(distance) { this.#coords.q += distance; }
    set moveY(distance) { this.#coords.r += distance; }
    set moveZ(distance) {
        this.#coords.q += distance; this.#coords.r -= distance;
    }

    // Axial coordinates using https://www.redblobgames.com/grids/hexagons/
    static size = 20;
    static width = Math.sqrt(3) * Hex.size;
    static height =  4/2 * Hex.size;
    static vert = 3/4 * Hex.height;
    static horiz = Hex.width;

    static getPosition(coords) {
        return [Hex.getLeft(coords)-Hex.size, Hex.getTop(coords)-Hex.size];
    }

    static getLeft(coords) { return coords.q*Hex.horiz*2 + coords.r*Hex.horiz; }
    static getTop(coords) { return coords.r*Hex.vert*2; }

    // static getLeft(coords) { return coords.q*Hex.vert*2; }
    // static getTop(coords) { return coords.r*Hex.horiz*2 + coords.q*Hex.horiz; }
}

class Vote {
    #history;
    #index;

    constructor(history) {
        this.#history = history;
        this.#index = -1;
    }

    get current() { return this.#index == -1 ? "" : this.#history[this.#index].vote; }
    get session() { return this.#index == -1 ? 0 : this.#history[this.#index].session; }
    set current(voteIndex) { this.#index = voteIndex; }
    get voteStyle() { return this.#index == -1 ? "" : this.#history[this.#index].style;}
    get voteClass() { return Vote.getClass(this.current, this.voteStyle); }
    get history() { return this.#history; }

    static styles = [];

    static classes = [
        "vote-for", "vote-against", "vote-abstain",
        "vote-absent", "vote-vacant", "hidden-vacant",
        "vote-option-1", "vote-option-2",
        "vote-option-3", "vote-option-4"
    ];

    static sanitise(state) {
        if (state == "No Vote") { return "Absent"; }
        if (state == "") { return "Vacant"; }
        return state;
    }

    static getClass(state, style) {
        switch(state) {
            case "Recommend Against":
                return "vote-against";
            case "Blank":
                return "vote-abstain";
            case "No Vote":
                return "vote-absent";
            case "":
                return "vote-vacant";
            case "For":
            case "Against":
            case "Abstain":
            case "Absent":
            case "Vacant":
                return "vote-"+state.toLowerCase();
            default:
                if (Vote.styles[style].indexOf(state) == -1) {
                    console.error("Invalid Vote Found", state, style);
                }
                return "vote-option-"+(Vote.styles[style].indexOf(state) + 1);
        }
    }

    static removeVoteClasses(node) {
        for(const vc of Vote.classes) { node.classList.remove(vc); }
    }
}

class Councillor {
    // attributes
    #title = "Demo";
    #type;
    #faculty;
    #initial;
    #isVacant = true;
    #vacantList;
    #member_class;

    // components
    #hex; //for positioning
    #vote;

    // nodes
    #node;
    #text;

    constructor(data) {
        this.#title = data.title;
        this.#type = data.type;
        this.#faculty = data.faculty;
        this.#initial = data.initial;
        this.#isVacant = !data.isCurrentlyFilled;
        this.#vacantList = data.vacantFor ? data.vacantFor: [];

        this.#hex = new Hex(data.coords);
        this.#member_class = this.setMemberType();
        this.#vote = new Vote(data.history);

        this.#node = this.createNode();
        this.setCurrentPosition();
    }

    get title() { return this.#title; }
    get node() { return this.#node; }
    get type() { return this.#type; }
    get faculty() {  return this.#faculty; }
    get colourClass() { return this.#member_class; }
    get classList() { return this.#node.classList; }
    get position() { return this.#hex.position; }
    get coords() { return [this.#hex.coords.q, this.#hex.coords.r]; }
    get vote() { return this.#vote.current; }
    get history() { return this.#vote.history; }
    get isVacant() { return this.#isVacant; }
    get vacantList() { return this.#vacantList; }
    get isCurrentlyVacant() {
        if(this.#vote.session == 0) { return this.#isVacant; }
        return this.#vacantList.includes(this.#vote.session) }

    set initial(bool) { this.#text.classList.toggle("opacity-hidden", bool) }
    set vote(recordIndex) {
        this.#vote.current = recordIndex;
        // Add the right classes for the current vote
        Vote.removeVoteClasses(this.#node);

        if (this.#vote.vote == "") {
            const toggleVacant = document.getElementById("toggle-vacant");
            this.#node.classList.toggle("hidden-vacant", !toggleVacant.checked);
        }

        this.#node.classList.toggle("vacant", this.isCurrentlyVacant);
        if (recordIndex == -1) { return }

        this.#node.classList.add(this.#vote.voteClass);
    }

    get voteClass() { return this.#vote.voteClass; }

    setMemberType() {
        switch(this.#faculty) {
            case "PGR":
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                return "member-" + this.#faculty.toLowerCase().replace(
                        " & ", "-and-").replace(" ", "-");
                break;
            default:
                return "member-" + this.#type.toLowerCase().replace(
                        " & ", "-and-").replace(" ", "-");
                break;
        }
    }

    createNode() {
        const node = document.createElement("div");

        node.classList.add("member");
        node.classList.add(this.#member_class);
        if (this.#isVacant) { node.classList.add("vacant"); }

        this.#text = document.createElement("p")

        this.#text.innerText = this.#initial;
        node.appendChild(this.#text)

        return node;
    }

    // Position code
    set position(coords) {
        this.#hex.coords = coords;
        this.#node.style.left = this.#hex.position[0]+"px";
        this.#node.style.top = this.#hex.position[1]+"px";
    }

    setCurrentPosition() {
        this.position = this.#hex.coords;
    }

    updateVoteClasses() {
        Vote.removeVoteClasses(this.#node);
        if (this.#vote.vote == "") {
            const toggleVacant = document.getElementById("toggle-vacant");
            this.#node.classList.toggle("hidden-vacant", !toggleVacant.checked);
        }
    }

    static list = [];
}

console.log("Hex, Votes, Councillor Classes Loaded");
