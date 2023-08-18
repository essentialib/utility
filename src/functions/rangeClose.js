const Range = require('../classes/Range');

/**
 *
 * @alias rangeInclude
 * @param {number} [start=0]
 * @param {number} stop
 * @param {number} [step=1 or -1]
 * @return {Range}
 */
module.exports = function rangeClose(start, stop, step) {
    if (step > 0) {
        return new Range(start, stop + 1, step);
    } else {
        return new Range(start, stop - 1, step);
    }
}