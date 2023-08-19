const is = require('./is');
const Pair = require('../classes/Pair');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isPair(item) {
    return is(item, Pair);
}