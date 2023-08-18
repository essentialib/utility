const typename = require('./typename');

/**
 * document
 * 
 * @param item
 * @return {boolean}
 */
module.exports = function isSet(item) {
    return typename(item) === 'Set';
}