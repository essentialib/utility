function Pair(first, second) {
    Object.defineProperty(this, 'first', {
        value: first, configurable: false
    });

    Object.defineProperty(this, 'second', {
        value: second, configurable: false
    });

    Object.defineProperty(this, 'length', {
        value: 2, configurable: false
    });

    this.toArray = function () {
        return [this.first, this.second];
    }
}

Pair.prototype.toString = function () {
    return '(' + this.first + ', ' + this.second + ')';
}

Pair.prototype[Symbol.iterator] = function () {
    let i = 0;
    let pair = this;

    return {
        next: function () {
            if (i === 0) {
                i++;
                return { value: pair.first, done: false };
            } else if (i === 1) {
                i++;
                return { value: pair.second, done: false };
            } else {
                return { done: true };
            }
        }
    };
}

module.exports = Pair;