const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isRegExp(item) {
    return typename(item) === 'RegExp';
}