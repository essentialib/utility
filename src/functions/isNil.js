const typename = require('./typename.js');

/**
 * document
 *
 * @description `item`이 `null` 또는 `undefined`인지 여부를 반환합니다.
 * @example
 * $.isNil(null); // true
 * $.isNil(undefined); // true
 * $.isNil(0); // false
 * $.isNil(''); // false
 * $.isNil(3); // false
 * @param {any} item
 * @return {boolean}
 */
module.exports = function isNil(item) {
    let typeName = typename(item);
    return typeName === 'null' || typeName === 'undefined';
}