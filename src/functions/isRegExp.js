const is = require('./is');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isRegExp(item) {
    return is(item, RegExp);
}