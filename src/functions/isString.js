const is = require('./is');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isString(item) {
    return is(item, String);
}