"use strict";

class Hex {
    static size = 20;
    static width = Math.sqrt(3) * Hex.size
    static height =  4/2 * Hex.size;
    static vert = 3/4 * Hex.height;
    static horiz = Hex.width;

    static getPosition(coords) {
        return [Hex.getLeft(coords)-Hex.size, Hex.getTop(coords)-Hex.size]
    }

    static getLeft(coords) {
        return coords.q*Hex.horiz*2 + coords.r*Hex.horiz;
    }

    static getTop(coords) {
        return coords.r*Hex.vert*2;
    }
}

class Vote {
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

    static getClass(state, options) {
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
                if (options.indexOf(state) == -1) {
                    console.error("Invalid Vote Found", state);
                }
                return "vote-option-"+(1+options.indexOf(state));
        }
    }
}

class Councillor {
    constructor(data) {
        this.title = data.title;
        this.type = data.type;
        this.faculty = data.faculty;
        this.initial = data.initial;
        this.isVacant = !data.isFilled;
        this.coords = data.coords;
        this.vote = "";
        this.history = data.history;

        this.member_type_class = this.setMemberType();

        this.node = this.createNode();
        this.setPosition(this.coords);
    }

    getTitle() { return this.title; }
    getNode() { return this.node; }
    getType() { return this.type; }
    getFaculty() { return this.faculty; }
    getColourClass() { return this.member_type_class; }
    getPosition() { return this.position; }
    getVote() { return this.vote; }

    setMemberType() {
        switch(this.faculty) {
            case "PGR":
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                return "member-" + this.faculty.toLowerCase().replace(
                        " & ", "-and-").replace(" ", "-");
                break;
            default:
                return "member-" + this.type.toLowerCase().replace(
                        " & ", "-and-").replace(" ", "-");
                break;
        }
    }

    createNode() {
        const node = document.createElement("div");
        node.classList.add("member");
        node.classList.add(this.member_type_class);
        if (this.isVacant) { node.classList.add("vacant"); }

        this.text = this.setNodeInitial();
        node.appendChild(this.text)
        return node;
    }

    setNodeInitial() {
        const text = document.createElement("p")

        switch(this.faculty) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                text.innerText = this.type == "PGR" ? this.initial : "";
                break;
            default:
                text.innerText = this.initial;
        }

        return text
    }

    // Position code
    setPosition(coords) {
        this.position = Hex.getPosition(coords);
        this.node.style.left = this.position[0]+"px";
        this.node.style.top = this.position[1]+"px";
    }

    setCurrentPosition() {
        this.setPosition(this.coords);
    }

    setVote(votingState, options) {
        if(this.isVacant) {
            this.vote = "Vacant";
            return;
        }

        this.clearVote();

        if (votingState == "") {
            const toggleVacant = document.getElementById("toggle-vacant");
            this.node.classList.toggle("hidden-vacant", !toggleVacant.checked);
        }

        this.vote = Vote.sanitise(votingState);
        this.node.classList.add(Vote.getClass(this.vote, options));
        this.setCurrentPosition();
    }

    clearVote() {
        for (const vc of Vote.classes) { this.node.classList.remove(vc); }
        this.vote = "";
    }
}
console.log("Hex, Votes, Councillor Classes Loaded");
