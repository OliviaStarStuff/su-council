"use strict";
class Councillor {

    static center = [400, 280];
    constructor(isVacant=false, data=null) {
        this.node = this.createCouncillor(isVacant, data.type);
        this.text = document.createElement("text")
        this.node.appendChild(this.text)
        this.data = data;
        this.isVacant = isVacant;
        this.vote = "";


        if (this.data.title.includes("PGR")){
            this.text.innerText = "PGR";
        }

        const size = 20;
        const width = Math.sqrt(3) * size
        const height =  4/2 * size;
        this.vert = 3/4 * height;
        this.horiz = width;
        this.setPosition(data.coords.q, data.coords.r);
    }
    // Getter
    createCouncillor(isVacant = false, member_type) {
        const circle = document.createElement("div");
        circle.classList.add("council-member");
        let member_type_class;
        member_type_class = "member-" + member_type.toLowerCase().replace(" & ", "-and-").replace(" ", "-");
        // console.log(member_type_class);
        circle.classList.add(member_type_class)
        if (isVacant) {
            circle.classList.add("vacant");
        }
        return circle;

    }

    setVote(votingState) {
        if(this.isVacant) { return; }

        this.clearVote()
        if (votingState == "No Vote") { votingState = "absent" }
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
        this.node.style.left = left+"px";
        this.node.style.top = top+"px";
        this.text.textContent;
    }
}