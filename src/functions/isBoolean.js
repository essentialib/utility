const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isBoolean(item) {
    return typename(item) === 'Boolean';
}