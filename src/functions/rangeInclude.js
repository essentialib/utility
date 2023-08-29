const Range = require('../classes/Range');
const rangeClose = require('./rangeClose');

/**
 *
 * @alias rangeClose
 * @param {number} [start=0]
 * @param {number} stop
 * @param {number} [step=1 or -1]
 * @return {Range}
 */
module.exports = function rangeInclude(start, stop, step) {
    return rangeClose(start, stop, step);
}