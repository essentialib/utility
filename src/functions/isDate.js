const is = require('./is');

/**
 * document
 * 
 * @param item
 * @return {boolean}
 */
module.exports = function isDate(item) {
    return is(item, Date);
}