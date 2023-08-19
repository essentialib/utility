const is = require('./is');

/**
 * document
 * @param item
 * @return {boolean}
 */
module.exports = function isHashtable(item) {
    return is(item, Object) || is(item, Map);
}