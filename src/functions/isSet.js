const is = require('./is');

/**
 * document
 * 
 * @param item
 * @return {boolean}
 */
module.exports = function isSet(item) {
    return is(item, Set);
}