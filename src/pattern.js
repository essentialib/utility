/**
 * @param {string|null} [flags=null]
 * @return {PatternBuilder}
 */
function PatternBuilder(flags) {
    flags ||= '';

    if (!(this instanceof PatternBuilder)) {
        return new PatternBuilder(flags);
    }

    if (typeof flags !== 'string') {
        throw new TypeError('PatternBuilder(flags): "flags" accepts only string');
    }

    this._flags = flags;
    this._source = '';
    this._buffer = '';
}

/**
 * @param {PatternBuilder} builder
 * @param {string|PatternBuilder} arguments
 * @return {PatternBuilder}
 */
function add(builder) {
    let args = Array.from(arguments).slice(1);

    if (!(builder instanceof PatternBuilder)) {
        throw new TypeError('add(builder, item): "builder" accepts only PatternBuilder');
    }

    if (builder._buffer != '') {
        builder._source += builder._buffer;
        builder._buffer = '';
    }

    args.forEach(e => {
        if (typeof e === 'string') {
            builder._buffer += e;
        } else if (e instanceof PatternBuilder) {
            builder._buffer += e._source + e._buffer;
        } else {
            throw new TypeError('add(builder, ...item): "item" accepts only string or PatternBuilder');
        }
    });

    return builder;
}

/**
 * @param {PatternBuilder} builder
 * @param {string} front
 * @param {string} back
 * @return {PatternBuilder}
 */
function wrap(builder, front, back) {
    // console.log(builder._source, [front, builder._buffer, back])

    if (!(builder instanceof PatternBuilder)) {
        throw new TypeError('add(builder, item): "builder" accepts only PatternBuilder');
    }

    builder._buffer = front + builder._buffer + back;
    return builder;
}

/**
 * @param {number|null} [min=null]
 * @param {number|null} [max=null]
 * @return {string}
 */
function repeat(min, max) {
    if (min != null) {
        if (!(typeof min === 'number' && Number.isInteger(min))) {
            throw new TypeError('repeat(min, max): "mix" accepts only integer');
        } else if (min < 0) {
            throw new TypeError('repeat(min, max): "mix" accepts only positive number');
        }

        if (max != null) {
            if (!(typeof max === 'number' && Number.isInteger(max))) {
                throw new TypeError('repeat(min, max): "max" accepts only integer');
            } else if (max < min) {
                throw new TypeError('repeat(min, max): "max" must be greater than "min"');
            }
        }

        return '{' + min + ',' + (max || '') + '}'
    } else {
        return '';
    }
}

PatternBuilder.prototype = {
    /**
     * @return {PatternBuilder}
     * @example
     * startOfLine() -> /^/
     */
    startOfLine() {
        return add(this, '^');
    },

    /**
     * @return {PatternBuilder}
     * @example
     * endOfLine() -> /$/
     */
    endOfLine() {
        return add(this, '$');
    },

    /**
     * @return {PatternBuilder}
     * @example
     * or() -> /|/
     */
    or() {
        return add(this, '|');
    },

    /**
     * @param {number|null} [min=null]
     * @param {number|null} [max=null]
     * @return {PatternBuilder}
     * @example
     * tab() -> /\t/
     * tab(2) -> /\t{2,}/
     * tab(2, 4) -> /\t{2,4}/
     */
    tab(min, max) {
        return add(this, '\\t', repeat(min, max));
    },

    /**
     * @param {number|null} [min=null]
     * @param {number|null} [max=null]
     * @return {PatternBuilder}
     * @example
     * word() -> /\w/
     * word(2) -> /\w{2,}/
     * word(2, 4) -> /\w{2,4}/
     */
    word(min, max) {
        return add(this, '\\w', repeat(min, max));
    },

    /**
     * @param {number|null} [min=null]
     * @param {number|null} [max=null]
     * @return {PatternBuilder}
     * @example
     * notWord() -> /\W/
     * notWord(2) -> /\W{2,}/
     * notWord(2, 4) -> /\W{2,4}/
     */
    notWord(min, max) {
        return add(this, '\\W', repeat(min, max));
    },

    /**
     * @param {number|null} [min=null]
     * @param {number|null} [max=null]
     * @return {PatternBuilder}
     * @example
     * digit() -> /\d/
     * digit(2) -> /\d{2,}/
     * digit(2, 4) -> /\d{2,4}/
     */
    digit(min, max) {
        return add(this, '\\d', repeat(min, max));
    },

    /**
     * @param {number|null} [min=null]
     * @param {number|null} [max=null]
     * @return {PatternBuilder}
     * @example
     * notDigit() -> /\D/
     * notDigit(2) -> /\D{2,}/
     * notDigit(2, 4) -> /\D{2,4}/
     */
    notDigit(min, max) {
        return add(this, '\\D', repeat(min, max));
    },

    /**
     * @param {number|null} [min=null]
     * @param {number|null} [max=null]
     * @return {PatternBuilder}
     * @example
     * whitespace() -> /\s/
     * whitespace(2) -> /\s{2,}/
     * whitespace(2, 4) -> /\s{2,4}/
     */
    whitespace(min, max) {
        return add(this, '\\s', repeat(min, max));
    },

    /**
     * @param {number|null} [min=null]
     * @param {number|null} [max=null]
     * @return {PatternBuilder}
     * @example
     * notWhitespace() -> /\S/
     * notWhitespace(2) -> /\S{2,}/
     * notWhitespace(2, 4) -> /\S{2,4}/
     */
    notWhitespace(min, max) {
        return add(this, '\\S', repeat(min, max));
    },

    /**
     * @param {string|function(PatternBuilder): PatternBuilder} item
     * @return {PatternBuilder}
     * @example
     * then('abc') -> /(?:abc)/
     * then(p => p.find('abc')) -> /(?:abc)/
     */
    then(item) {
        if (typeof item === 'string') {
            let escapes = ['[', ']', '.', '|', '*', '?', '+', '(', ')', '{', '}', '^', '$', '\\'];
            return add(this, '(?:' + (escapes.includes(item) ? '\\' : '') + item + ')');
        } else if (typeof item === 'function') {
            return add(this, item(new PatternBuilder()));
        } else {
            throw new TypeError('then(item): "item" accepts only string or function(PatternBuilder): PatternBuilder');
        }
    },

    /**
     * @param {string|function(PatternBuilder): PatternBuilder} item
     * @return {PatternBuilder}
     * @example
     * find('abc') -> /(?:abc)/
     * find(p => p.then('abc')) -> /(?:abc)/
     */
    find(item) {
        return this.then(item);
    },

    /**
     * @return {PatternBuilder}
     * @example
     * linebreak() -> /(?:\r\n|\r|\n)/
     */
    linebreak() {
        return this.then('\\r\\n|\\r|\\n');
    },

    /**
     * @return {PatternBuilder}
     * @example
     * br() -> /(?:\r\n|\r|\n)/
     */
    br() {
        return this.linebreak();
    },

    /**
     * @return {PatternBuilder}
     * @example
     * anything() -> /./
     */
    anything() {
        return add(this, '.');
    },

    /**
     * @param {...string|string[2]} arguments - characters
     * @return {PatternBuilder}
     * @example
     * anythingBut('abc') -> /[^abc]/
     * anythingBut('a', ['ㄱ', 'ㅎ']) -> /[^aㄱ-ㅎ]/
     */
    anythingBut() {
        let args = Array.from(arguments);
        let joined = args.map(e => {
            if (Array.isArray(e)) {
                if (e.length !== 2 || e.every(e => typeof e === 'string') === false) {
                    throw new TypeError('anythingBut(...arguments): "arguments" accepts string array with length 2');
                }
                return e.join('-');
            } else if (typeof e === 'string') {
                return (e === '-' ? '\\' : '') + e;
            } else {
                throw new TypeError('anythingBut(...arguments): "arguments" accepts only string or array');
            }
        }).join('');

        return add(this, '[' + joined + ']');
    },

    /**
     * @param {...string|string[2]} arguments - characters
     * @return {PatternBuilder}
     * @example
     * anythingOf('abc') -> /[abc]/
     * anythingOf('a', ['ㄱ', 'ㅎ']) -> /[aㄱ-ㅎ]/
     */
    anythingOf() {
        let args = Array.from(arguments);
        let joined = args.map(e => {
            if (Array.isArray(e)) {
                if (e.length !== 2 || e.every(e => typeof e === 'string') === false) {
                    throw new TypeError('anythingOf(...arguments): "arguments" accepts array with 2 strings');
                }
                return e.join('-');
            } else if (typeof e === 'string') {
                return (e === '-' ? '\\' : '') + e;
            } else {
                throw new TypeError('anythingOf(...arguments): "arguments" accepts only string or array');
            }
        }).join('');

        return add(this, '[' + joined + ']');
    },

    /**
     * @param {string|null} [str=null]
     * @return {PatternBuilder}
     * @example
     * oneOrMore('abc') -> /(?:abc)+\/
     * then('abc').oneOrMore() -> /(?:abc)+\/
     */
    oneOrMore(str) {
        if (str == null) {
            if (this._buffer == null) {
                add(this, '+');
            } else {
                wrap(this, '(?:', ')+');
            }
        } else if (typeof str === 'string') {
            add(this, '(?:' + str + ')+');
        } else {
            throw new TypeError('oneOrMore(str): "str" accepts only string or null');
        }

        return this;
    },

    /**
     * @param {string|null} [str=null]
     * @return {PatternBuilder}
     * @example
     * noneOrMore('abc') -> /(?:abc)*\/
     * then('abc').noneOrMore() -> /(?:abc)*\/
     */
    noneOrMore(str) {
        if (str == null) {
            if (this._buffer == null) {
                add(this, '*');
            } else {
                wrap(this, '(?:', ')*');
            }
        } else if (typeof str === 'string') {
            add(this, '(?:' + str + ')*');
        } else {
            throw new TypeError('noneOrMore(str): "str" accepts only string or null');
        }

        return this;
    },

    /**
     * @param {null|string} [str=null]
     * @return {PatternBuilder}
     * @example
     * maybe('abc') -> /(?:abc)?/
     * then('abc').maybe() -> /(?:abc)?/
     */
    maybe(str) {
        if (str == null) {
            if (this._buffer == null) {
                add(this, '?');
            } else {
                wrap(this, '(?:', ')?');
            }
        } else if (typeof str === 'string') {
            add(this, '(?:' + str + ')?');
        } else {
            throw new TypeError('maybe() accepts only string or null');
        }

        return this;
    },

    /**
     * @param {number} min
     * @param {number|null} [max=null]
     * @return {PatternBuilder}
     * @example
     * repeat(3) -> /{3,}/
     * repeat(3, 5) -> /{3,5}/
     */
    repeat(min, max) {
        if (typeof min !== 'number') {
            throw new TypeError('repeat(min, max): "min" accepts only number');
        }

        wrap(this, '(?:', ')' + repeat(min, max));

        return this;
    },

    /**
     * @param {string|null} [item=null]
     * @param {Function} pattern
     * @return {PatternBuilder}
     * @example
     * capture(p => p.find('abc')) -> /(abc)/
     * capture('item', p => p.find('abc')) -> /(?<item>abc)/
     */
    capture(item, pattern) {
        if (typeof item === 'function' && arguments.length === 1) {
            return this.capture(null, item);
        }

        if (item != null && typeof item !== 'string') {
            throw new TypeError('capture(item, pattern): "item" accepts only string');
        }

        if (typeof pattern !== 'function') {
            throw new TypeError('capture(pattern): "pattern" accepts only function');
        }

        add(this, '(' + (item != null ? '?<' + item + '>' : '') , pattern(new PatternBuilder()), ')');

        return this;
    }
};

///////////////////////////////////////////////////////////////////////////////

/**
 * @param {RegExp} regexp
 * @param {string} flags
 * @return {PatternExp}
 */
function PatternExp(regexp, flags) {
    this.regexp = regexp;
    this.flags = flags;
}

PatternExp.prototype = Object.create(RegExp.prototype);
PatternExp.prototype.constructor = PatternExp;
PatternExp.prototype = {
    /**
     * @return {string}
     */
    toString() {
        return this.regexp.source();
    },

    /**
     * @return {RegExp}
     */
    toRegExp() {
        return this.regexp;
    },

    /**
     * @param {string} str
     * @return {RegExpExecArray}
     */
    exec(str) {
        return this.regexp.exec(str);
    },

    /**
     * @param {string} str
     * @return {boolean}
     */
    test(str) {
        return this.regexp.test(str);
    },

    /**
     * @param {string} str
     * @return {RegExpMatchArray}
     */
    match(str) {
        return str.match(this.regexp);
    },

    /**
     * @param {string} str
     * @return {IterableIterator<RegExpMatchArray>}
     */
    matchAll(str) {
        return str.matchAll(this.regexp);
    },

    /**
     * @param {string} str
     * @param {string} replacement
     * @return {string}
     */
    replace(str, replacement) {
        return str.replace(this.regexp, replacement);
    },

    /**
     * @param {string} str
     * @return {number}
     */
    search(str) {
        return str.search(this.regexp);
    },

    /**
     * @param {string} str
     * @return {string[]}
     */
    split(str) {
        return str.split(this.regexp);
    }
};

///////////////////////////////////////////////////////////////////////////////

/**
 * @param {function(PatternBuilder): PatternBuilder} pattern
 * @param {string} [flags='']
 * @return {PatternExp}
 */
Pattern = (pattern, flags) => {
    flags ||= '';

    if (typeof pattern !== 'function') {
        throw new TypeError('Pattern(pattern, flags): "pattern" accepts only function');
    }

    if (typeof flags !== 'string') {
        throw new TypeError('Pattern(pattern, flags): "flags" accepts only string');
    }

    let builder = pattern(new PatternBuilder(flags));

    if (builder._buffer != null) {
        builder._source += builder._buffer;
    }
    builder._buffer = null;

    return new PatternExp(new RegExp(builder._source, builder._flags), builder._flags);
};

module.exports = Pattern;