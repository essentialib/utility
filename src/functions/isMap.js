const is = require('./is');

/**
 * document
 * @param item
 * @return {boolean}
 */
module.exports = function isMap(item) {
    return is(item, Map);
}