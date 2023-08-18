const typename = require('./typename');

/**
 * document
 * 
 * @param item
 * @return {boolean}
 */
module.exports = function isDate(item) {
    return typename(item) === 'Date';
}