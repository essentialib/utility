const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isSymbol(item) {
    return typename(item) === 'Symbol';
}