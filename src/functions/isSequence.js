const is = require('./is');

/**
 * document
 * @param item
 * @return {boolean}
 */
module.exports = function isSequence(item) {
    return is(item, Array) || is(item, String) || is(item, Set);
}