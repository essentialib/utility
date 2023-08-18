function Tuple(args) {
    Object.defineProperty(this, 'length', {
        value: args.length, configurable: false
    });

    this.toArray = function () {
        return args;
    }

    this.get = function (index) {
        return args[index];
    }
}

Tuple.prototype.toString = function () {
    let str = '(';
    for (let i = 0; i < this.length; i++) {
        str += this.get(i) + ', ';
    }
    str = str.slice(0, -2) + ')';

    return str;
}

Tuple.prototype[Symbol.iterator] = function () {
    let index = 0;

    return {
        next: () => {
            if (index < this.length) {
                return { value: this.get(index++), done: false };
            } else {
                return { value: undefined, done: true };
            }
        }
    }
}

module.exports = Tuple;