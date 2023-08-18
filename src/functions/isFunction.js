const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isFunction(item) {
    return typename(item) === 'Function';
}