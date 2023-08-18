const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isArray(item) {
    return typename(item) === 'Array';
}