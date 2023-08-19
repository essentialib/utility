const is = require('./is');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isSymbol(item) {
    return is(item, Symbol);
}