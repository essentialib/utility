const identity = require('./identity');
const each = require('./each');
const isHashtable = require('./isHashtable');
const isMap = require('./isMap');
const isObject = require('./isObject');

/**
 * document
 * @param iterable
 * @param [iteratee]
 * @return {{}}
 */
module.exports = function mapKeys(iterable, iteratee) {
    iteratee ||= identity;

    if (!isHashtable(iterable)) {
        throw new TypeError(iterable + ' is not hash table');
    }

    let ret;
    if (isMap(iterable)) {
        ret = new Map();

        each(iterable, (v, k) => {
            ret.set(iteratee(v, k), v);
        });
    } else if (isObject(iterable)) {
        ret = {};

        each(iterable, (v, k) => {
            ret[iteratee(v, k)] = v;
        });
    }

    return ret;
}