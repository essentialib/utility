const isIterable = require('./isIterable');
const isObject = require('./isObject');
const isMap = require('./isMap');
const isSet = require('./isSet');
const hasIndex = require('./hasIndex');

/**
 *
 * @param item
 * @return {Set<any>|*|*[]}
 */
module.exports = function values(item) {
    if (!isIterable(item)) {
        throw new TypeError(item + ' is not __content');
    }

    if (isObject(item)) {
        let ret = new Set();
        for (let key in item) {
            ret.add(item[key]);
        }
        return ret;
    } else if (isMap(item)) {
        let ret = new Set();
        item.forEach((_, k) => {
            ret.add(k);
        });
        return ret;
    } else if (isSet(item)) {
        return item;
    } else if (hasIndex(item)) {
        let ret = [];
        for (let i = 0; i < item.length; i++) {
            ret.add(item[i]);
        }
        return ret;
    }
}