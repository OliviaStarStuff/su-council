"use strict";
class Councillor {
    static center = [400, 280];
    constructor(data=null) {
        this.data = data;
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
        this.setPosition(data.coords.q, data.coords.r);
    }
    // Getter
    createNode(isVacant = false, member_type) {
        const circle = document.createElement("div");
        circle.classList.add("council-member");
        let member_type_class = "member-";
        member_type_class += member_type.toLowerCase().replace(" & ", "-and-").replace(" ", "-");
        circle.classList.add(member_type_class)
        if (isVacant) {
            circle.classList.add("vacant");
        }
        return circle;

    }

    setVote(votingState, options, style) {
        if(this.isVacant) { this.vote = "Vacant"; return;}

        this.clearVote();
        if (votingState == "No Vote" || votingState == "") { votingState = "Absent" }
        this.vote = votingState;
        if (style == "custom") {
            switch(votingState) {
                case "Recommend Against":
                    this.node.classList.add("vote-against");
                    break;
                case "Blank":
                    this.node.classList.add("vote-abstain");
                    break;
                case "Abstain":
                case "No Vote":
                case "Against":
                case "Absent":
                    this.node.classList.add("vote-"+votingState.toLowerCase());
                    break;
                default:
                    if (options.indexOf(votingState) == -1) {
                        console.error("Invalid Vote Found", votingState);
                    }
                    this.node.classList.add("vote-option-"+(1+options.indexOf(votingState)));
            }
        } else {
            this.node.classList.add("vote-"+votingState.toLowerCase());
        }
    }
    getNode() {
        return this.node;
    }

    clearVote() {
        this.node.classList.remove("vote-against");
        this.node.classList.remove("vote-for");
        this.node.classList.remove("vote-abstain");
        this.node.classList.remove("vote-absent");
        this.vote = "";
    }

    getType() {
        return this.data.type;
    }
    getFaculty() {
        return this.data.faculty;
    }

    getVote() {
        return this.vote;
    }

    setPosition(q, r) {
        const left = q * this.horiz*2 + r*this.horiz+Councillor.center[0];
        const top = r * this.vert*2 +Councillor.center[1];
        this.coords = [q, r];
        const center = this.isVacant ? 10: 20;
        this.node.style.left = left-center+"px";
        this.node.style.top = top-center+"px";
        this.text.textContent;
    }
}