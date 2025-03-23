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

    // static getLeft(coords) { return coords.q*Hex.horiz*2 + coords.r*Hex.horiz; }
    // static getTop(coords) { return coords.r*Hex.vert*2; }

    static getLeft(coords) { return coords.q*Hex.vert*2; }
    static getTop(coords) { return coords.r*Hex.horiz*2 + coords.q*Hex.horiz; }
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
    get isProxy() { return this.#index == -1 ? false : this.#history[this.#index].isProxy; }
    get index() { return this.#index; }

    static #isSimple = false;
    static set isSimple(bool) { Vote.#isSimple = bool; }
    static get isSimple() { return Vote.#isSimple; }
    static styles = [];

    static classes = [
        "vote",
        "vote-for", "vote-against", "vote-abstain",
        "vote-absent", "vote-vacant", "hidden-vacant",
        "vote-option-1", "vote-option-2",
        "vote-option-3", "vote-option-4",
        "fa-certificate", "fa-cloud", "fa-star",
        "fa-heart", "fa-diamond", "fa-ghost", "fa-burst", "fa-heart-crack",
        "fa-skull", "fa-rocket", "fa-hand-back-fist", "fa-virus"
    ];
    static multiVote = ["fa-heart", "fa-diamond", "fa-rocket", "fa-ghost"]

    static sanitise(state) {
        if (state == "No Vote") { return "Absent"; }
        if (state == "") { return "Vacant"; }
        return state;
    }

    static getClass(state, style) {
        if (Vote.#isSimple) {
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
        } else {
            switch(state) {
                case "Recommend Against":
                    // return "fa-heart-crack";
                    return "fa-certificate";
                    // return "vote-against";
                case "Blank":
                    return "fa-cloud";
                    return "vote-abstain";
                case "No Vote":
                    return "vote-absent";
                case "":
                    return "vote-vacant";
                case "For":
                    return "fa-star";
                case "Against":
                    // return "fa-skull";
                    // return "fa-heart-crack";
                    // return "fa-burst";
                    // return "fa-hand-back-fist";
                    // return "fa-rocket";
                    // return "fa-virus";
                    return "fa-certificate";
                case "Abstain":
                    return "fa-ghost";
                    return "fa-cloud";
                case "Absent":
                case "Vacant":
                    return "vote-"+state.toLowerCase();
                default:
                    if (Vote.styles[style].indexOf(state) == -1) {
                        console.error("Invalid Vote Found", state, style);
                    }
                    // return Vote.multiVote[Vote.styles[style].indexOf(state)]
                    return "vote-option-"+(Vote.styles[style].indexOf(state) + 1);
            }
        }
    }

    static removeVoteClasses(node) {
        for(const vc of Vote.classes) { node.classList.remove(vc); }
    }
}

class Bio {
    #name = "Steven Universe";
    #pronouns = "They/Them";
    #degree = "Gem BA";
    #email = "";
    #year = "2nd";
    #picture;
    #manifesto = "If you're evil and you're on the rise\n" +
                "You can count on the four of us taking you down\n" +
                "'Cause we're good and evil never beats us\n" +
                "We'll win the fight and then go out for pizzas\n" +
                "We are the Crystal Gems\n" +
                "We'll always save the day!\n" +
                "And if you think we can't\n" +
                "We'll always find a way!\n" +
                "That's why the people of this world believe in\n" +
                "Garnet, Amethyst, and Pearl and Steven!";
    #socials = {
        "Mastodon": "https://fosstodon.org/@Oliviastarstuff",
        "Bluesky": "https://bsky.app/profile/erininthemorning.com"
    }

    constructor(bioData) {
        if(!bioData) { return; }
        this.#name = bioData.name;
        this.#email = bioData.email;
        this.#pronouns = bioData.pronouns;
        this.#degree = bioData.degree;
        this.#year = bioData.year;
        this.#picture = bioData.picture;
        this.#manifesto = bioData.manifesto;
        this.#socials = bioData.socials;
    }

    get name() { return this.#name }
    get pronouns() { return this.#pronouns }
    get degree() { return this.#degree }
    get email() { return this.#email }
    get year() { return this.#year }
    get picture() { return this.#picture }
    get email() { return this.#email }
    get manifesto() { return this.#manifesto }
    get socials() { return this.#socials }
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
    #career;

    // components
    #hex; //for positioning
    #vote;
    #bio;

    // nodes
    #node;
    #text;
    #icon;

    constructor(data, bioData) {
        this.#title = data.title;
        this.#type = data.type;
        this.#faculty = data.faculty;
        this.#initial = data.initial;
        this.#isVacant = !data.isCurrentlyFilled;
        this.#vacantList = data.vacantFor ? data.vacantFor : [];
        this.#career = data.career ? data.career : [];

        this.#hex = new Hex(data.coords);
        this.#member_class = this.setMemberType();
        this.#vote = new Vote(data.history);
        this.#bio = new Bio(bioData);
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
    get career() { return this.#career; }

    get vote() { return this.#vote.current; }
    get voteIndex() { return this.#vote.index; }
    get voteHistory() { return this.#vote.history; }

    get bio() { return this.#bio; }
    get isVacant() { return this.#isVacant; }
    get vacantList() { return this.#vacantList; }
    get isCurrentlyVacant() {
        if(this.#vote.session == 0) { return this.#isVacant; }
        return this.#vacantList.includes(this.#vote.session)
    }
    get effectiveGroup() {
        switch(this.#faculty) {
            case "AMRC":
            case "Apprentices":
            case "Foundation":
            case "SU":
                return this.#type;
                break;
            default:
                return this.#faculty;
        }
    }

    get isVoteProxied() { return this.#vote.isProxy }

    get initial() {
        return this.#initial;
    }
    set initial(bool) { this.#text.classList.toggle("opacity-hidden", bool) }
    set vote(recordIndex) {
        this.#vote.current = recordIndex;
        // Add the right classes for the current vote
        this.updateVoteClasses();
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

        this.#icon = document.createElement("div");
        this.#icon.classList.add("fa-solid");
        const shadow = document.createElement("div");
        shadow.classList.add("fa-solid");
        shadow.classList.add("shadow");
        this.#text = document.createElement("p")

        this.#text.innerText = this.#initial;
        node.appendChild(shadow);
        node.appendChild(this.#icon);
        this.#icon.appendChild(this.#text)

        return node;
    }

    // Position code
    set position(coords) {
        this.#hex.coords = coords;
        this.#node.style.setProperty("--q", this.#hex.coords.q)
        this.#node.style.setProperty("--r", this.#hex.coords.r)
        // this.#node.style.left = this.#hex.position[0]+"px";
        // this.#node.style.top = this.#hex.position[1]+"px";
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

        this.#node.classList.toggle("vacant", this.isCurrentlyVacant);
        if (this.#vote.index == -1) { return }
        this.#node.classList.add("vote");
        this.#node.classList.add(this.#vote.voteClass);
    }

    static list = [];

    static getGroup(groupName) {
        const group_list = [];
        // return Councillor.list.filter(x => x.effectiveGroup == groupName);
        for (const c of Councillor.list) {
            if (c.effectiveGroup == groupName) {
                group_list.push(c);
            }
        }
        return group_list;
    }
}

console.log("Hex, Votes, Councillor Classes Loaded");
