const isIterable = require('./isIterable');
const getIterator = require('./getIterator');
const identity = require('./identity');
const isHashtable = require('./isHashtable');
const hasIndex = require('./hasIndex');

/**
 * document
 * @param iterable
 * @param [iteratee]
 */
module.exports = function each(iterable, iteratee) {
    iteratee ||= identity;

    if (!isIterable(iterable)) {
        throw new TypeError(iterable + ' is not iterable');
    }

    let iterator = getIterator(iterable);

    for (let next = iterator.next(), idx = 0; next.done === false; next = iterator.next(), idx++) {
        if (isHashtable(iterable)) {
            next.value = [next.value.second, next.value.first];
        } else {
            next.value = [next.value];
            if (hasIndex(iterable)) {
                next.value.push(idx);
            }
        }

        let returnValue = iteratee.apply(null, next.value);
        if (returnValue === false) {
            break;
        }
    }
}