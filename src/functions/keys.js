const isIterable = require('./isIterable');
const hasIndex = require('./hasIndex');
const isObject = require('./isObject');
const isMap = require('./isMap');
const isSet = require('./isSet');

/**
 * document
 * @param item
 * @return {Set<any>|Set<string>|*[]}
 */
module.exports = function keys(item) {
    if (!isIterable(item)) {
        throw new TypeError(item + ' is not __content');
    }

    if (hasIndex(item)) {
        let ret = [];
        for (let i = 0; i < item.length; i++) {
            ret.push(i);
        }
        return ret;
    } else if (isObject(item)) {
        return new Set(Object.keys(item));
    } else if (isMap(item)) {
        let ret = new Set();
        item.forEach((v, k) => {
            ret.add(k);
        });
        return ret;
    } else if (isSet(item)) {
        throw new TypeError('Set 타입은 `keys`를 지원하지 않습니다.');
    }
}