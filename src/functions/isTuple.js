const is = require('./is');
const Tuple = require('../classes/Tuple');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isTuple(item) {
    return is(item, Tuple);
}