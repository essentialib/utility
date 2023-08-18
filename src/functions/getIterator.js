const isIterable = require('./isIterable');
const isHashtable = require('./isHashtable');
const isObject = require('./isObject');
const pair = require('./pair');

/**
 * document
 * @param item
 * @return {*|{next(): ({value: *, done: boolean})}}
 */
module.exports = function getIterator(item) {
    if (isIterable(item) === false) {
        throw new TypeError(item + ' is not iterable');
    }

    if (!isHashtable(item)) return item[Symbol.iterator]();

    if (isObject(item)) return function () {
        const keys = Object.keys(item);
        let index = 0;

        return {
            next() {
                if (index < keys.length) {
                    return {value: pair(item[keys[index]], keys[index++]), done: false};
                } else {
                    return {done: true};
                }
            }
        }
    }(); else return function () {
        const items = Array.from(item);
        let index = 0;

        return {
            next() {
                if (index < items.length) {
                    return {value: pair(items[index][0], items[index++][1]), done: false};
                } else {
                    return {done: true};
                }
            }
        }
    }();
}