const typename = require('./typename');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isNull(item) {
    return typename(item) === 'null';
}