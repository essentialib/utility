const is = require('./is');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isBoolean(item) {
    return is(item, Boolean);
}