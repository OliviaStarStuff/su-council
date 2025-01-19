"use strict";


class Councillor {
    static center = [0, 0];
    constructor(data=null) {
        this.data = data;
        this.member_type_class = "member-";
        switch(data.faculty) {
            case "PGR":
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                this.node = this.createNode(!data.isFilled, data.faculty);
                break;
            default:
                this.node = this.createNode(!data.isFilled, data.type);
        }
        //
        this.text = document.createElement("text")
        this.node.appendChild(this.text)

        this.isVacant = !data.isFilled;
        this.vote = "";

        switch(data.faculty) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                this.text.innerText = data.type == "PGR" ? data.initial : "";
                break;
            default:
                this.text.innerText = data.initial;
        }

        const size = 20;
        const width = Math.sqrt(3) * size
        const height =  4/2 * size;
        this.vert = 3/4 * height;
        this.horiz = width;
        this.position = [0,0];
        this.setPosition(data.coords.q, data.coords.r);
    }
    // Getter
    createNode(isVacant = false, member_type) {
        const circle = document.createElement("div");
        circle.classList.add("member");
        this.member_type_class += member_type.toLowerCase().replace(" & ", "-and-").replace(" ", "-");
        circle.classList.add(this.member_type_class)
        if (isVacant) {
            circle.classList.add("vacant");
        }
        return circle;

    }

    setVote(votingState, options, style) {
        if(this.isVacant) { this.vote = "Vacant"; return;}

        this.clearVote();
        if (votingState == "No Vote") { votingState = "Absent" }
        else if (votingState == "") {
            votingState = "Vacant";
            const toggleVacant = document.getElementById("toggle-vacant");
            this.node.classList.toggle("hidden-vacant", !toggleVacant.checked);
        }
        this.vote = votingState;
        if (style == "custom") {
            this.node.classList.add(Councillor.getVoteClass(this.vote, options))
        } else {
            this.node.classList.add("vote-"+this.vote.toLowerCase());
        }
        this.setCurrentPosition()
    }
    getNode() {
        return this.node;
    }

    clearVote() {
        const voteClasses = [
            "vote-against", "vote-for", "vote-abstain", "vote-absent", "vote-vacant",
            "vote-option-1", "vote-option-2", "vote-option-3", "vote-option-4", "hidden-vacant"
        ];

        for (const voteClass of voteClasses) {
            this.node.classList.remove(voteClass);
        }
        this.vote = "";
    }

    getType() {
        return this.data.type;
    }
    getFaculty() {
        return this.data.faculty;
    }

    getTitle() {
        return this.data.title;
    }

    getColourClass() {
        return this.member_type_class;
    }

    getVote() {
        return this.vote;
    }

    setPosition(q, r) {
        const left = q * this.horiz*2 + r*this.horiz+Councillor.center[0];
        const top = r * this.vert*2 +Councillor.center[1];
        this.coords = [q, r];
        const center = 20;
        this.node.style.left = Math.round(left-center)+"px";
        this.node.style.top = Math.round(top-center)+"px";
        this.position[0] = Math.round(left-center);
        this.position[1] = Math.round(top-center);
        this.text.textContent;
    }

    static getLeft(q, r, horiz) {
        return q * horiz*2 + r * horiz + Councillor.center[0];
    }

    static getTop(r, vert) {
        return r * vert*2 + Councillor.center[1];
    }

    setCurrentPosition() {
        this.setPosition(this.coords[0], this.coords[1]);
        // console.log(this.coords, Councillor.center)
    }

    static getVoteClass(state, options) {
        switch(state) {
            case "Recommend Against":
                return "vote-against";
            case "Blank":
                return "vote-abstain";
            case "No Vote":
            case "":
                return "vote-absent";
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