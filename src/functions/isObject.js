const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isObject(item) {
    return typename(item) === 'Object';
}