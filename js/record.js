class Record {
    static #records = {}

    static getYear(period) {
        return Record.#records[period]
    }

    static getRecord(period, index) {
        return Record.getYear(period).policies[index];
    }

    static get records() { return this.#records; }
    static set records(data) { Record.#records = data; }
}

class Group {
    static #groups = {}

    static getYear(period) {
        return Group.#groups[period]
    }

    static getGroup(period, index) {
        return Group.getYear(period)[index];
    }

    static get groups() { return this.#groups; }
    static set groups(data) { Group.#groups = data; }
}

class Session {
    static #sessions = {}

    static getYear(period) {
        return Session.#sessions[period]
    }

    static getSession(period, index) {
        return Session.getYear(period)[index];
    }

    static get sessions() { return this.#sessions; }
    static set sessions(data) { Session.#sessions = data; }
}

