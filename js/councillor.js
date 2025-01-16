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
        this.position = [0,0];
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
            console.log(style);
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
                    break;
            }
        } else {
            this.node.classList.add("vote-"+votingState.toLowerCase());
        }
        this.setCurrentPosition()
    }
    getNode() {
        return this.node;
    }

    clearVote() {
        const voteClasses = [
            "vote-against", "vote-for", "vote-abstain", "vote-absent",
            "vote-option-1", "vote-option-2", "vote-option-3", "vote-option-4"
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
    }
}