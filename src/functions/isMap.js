const typename = require('./typename');

/**
 * document
 * @param item
 * @return {boolean}
 */
module.exports = function isMap(item) {
    return typename(item) === 'Map';
}