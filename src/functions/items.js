const isIterable = require('./isIterable');
const isSet = require('./isSet');
const isSequence = require('./isSequence');
const isHashtable = require('./isHashtable');
const each = require('./each');
const pair = require('./pair');

/**
 * document
 * @param item
 * @return {Set<any> | *[]}
 */
module.exports = function items(item) {
    if (!isIterable(item)) {
        throw new TypeError(item + ' is not iterable');
    }

    let ret;

    if (isSet(item)) {
        throw new TypeError('Set 타입은 `items`를 지원하지 않습니다.');
    } else if (isSequence(item)) {
        ret = [];
        each(item, (v, k) => {
            ret.push(pair(k, v));
        });
    } else if (isHashtable(item)) {
        ret = new Set();
        each(item, (v, k) => {
            ret.add(pair(k, v));
        });
    }

    return ret;
}