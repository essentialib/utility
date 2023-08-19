const is = require('./is');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isObject(item) {
    return is(item, Object);
}