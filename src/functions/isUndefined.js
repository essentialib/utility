const typename = require('./typename');

/**
 * document
 * 
 * @param item
 * @return {boolean}
 */
module.exports = function isUndefined(item) {
    return typename(item) === 'undefined';
}