const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isIterable(item) {
    return typename(item) === 'Object' || typename(item[Symbol.iterator]) === 'Function';
    // Object.entries() 가 Object[Symbol.iterator] 기능을 해주기 때문에 Object도 iterable이라고 생각함.
}