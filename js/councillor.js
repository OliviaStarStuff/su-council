"use strict";
class Councillor {

    static center = [400, 280];
    constructor(data=null) {
        this.node = this.createNode(!data.isFilled, data.type);
        this.text = document.createElement("text")
        this.node.appendChild(this.text)
        this.data = data;
        this.isVacant = !data.isFilled;
        this.vote = "";

        switch(data.type) {
            case "Social Science":
            case "Science":
            case "Arts & Humanities":
            case "Engineering":
            case "Health":
                this.text.innerText = data.title.includes("PGR") ? data.initial : "";
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

    setVote(votingState) {
        if(this.isVacant) { return; }

        this.clearVote()
        if (votingState == "No Vote" || votingState == "") { votingState = "absent" }
        this.vote = votingState;
        this.node.classList.add("vote-"+votingState.toLowerCase());
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