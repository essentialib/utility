const isIterable = require('./isIterable');
const isHashtable = require('./isHashtable');
const isObject = require('./isObject');

/**
 * document
 * @param iterable
 * @return {*|{next(): ({value: *, done: boolean})}}
 */
module.exports = function getIterator(iterable) {
    if (!isIterable(iterable)) {
        throw new TypeError(iterable + ' is not __content');
    }

    if (!isObject(iterable)) return function () {
        return iterable[Symbol.iterator]();
    }();
    else return function () {
        const keys = Object.keys(iterable);
        let index = 0;

        return {
            next() {
                if (index < keys.length) {
                    return {value: [keys[index], iterable[keys[index++]]], done: false};
                } else {
                    return {done: true};
                }
            }
        }
    }();
}