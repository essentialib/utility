const is = require('./is');
const Range = require('../classes/Range');

/**
 * document
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isRange(item) {
    return is(item, Range);
}