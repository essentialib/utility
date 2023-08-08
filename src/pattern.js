function Pattern() {
    // super('', 'gm');

}

Pattern.prototype = Object.create(RegExp.prototype);
Pattern.prototype.constructor = Pattern;

Pattern.prototype = {
    startOfLine() {
        this.regexp += '^';
        return this;
    },

    endOfLine() {
        this.regexp += '$';
        return this;
    },

    then(str) {
        this.regexp += '(?:' + str + ')';
        return this;
    },

    or(str) {
        this.regexp += '|' + str;
        return this;
    },

    maybe(str) {
        this.regexp += '(?:' + str + ')?';
        return this;
    },

    anything() {
        this.regexp += '(?:.*)';
        return this;
    },

    anythingBut(str) {
        this.regexp += '(?:[^' + str + ']*)';
        return this;
    },

    anyOf(str) {
        this.regexp += '[' + str + ']';
        return this;
    },

    something() {
        this.regexp += '(?:.+)';
        return this;
    },

    somethingBut(str) {
        this.regexp += '(?:[^' + str + ']+)';
        return this;
    }
}