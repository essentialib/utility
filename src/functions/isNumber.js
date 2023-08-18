const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isNumber(item) {
    return typename(item) === 'Number';
}