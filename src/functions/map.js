const identity = require('./identity');
const isIterable = require('./isIterable');
const isArray = require('./isArray');
const isSet = require('./isSet');
const isMap = require('./isMap');
const isObject = require('./isObject');
const each = require('./each');

/**
 * document
 * @param iterable
 * @param [iteratee]
 * @return {{}}
 */
module.exports = function map(iterable, iteratee) {
    iteratee ||= identity;

    if (!isIterable(iterable)) {
        throw new TypeError(iterable + ' is not iterable');
    }

    let ret;
    if (isArray(iterable)) {
        ret = [];

        each(iterable, (e, i) => {
            ret.push(iteratee(e, i));
        });
    } else if (isSet(iterable)) {
        ret = new Set();

        each(iterable, (e, i) => {
            ret.add(iteratee(e, i));
        });
    } else if (isMap(iterable)) {
        ret = new Map();

        each(iterable, (v, k) => {
            ret.set(k, iteratee(v, k));
        });
    } else if (isObject(iterable)) {
        ret = {};

        each(iterable, (v, k) => {
            ret[k] = iteratee(v, k);
        });
    }

    return ret;
}