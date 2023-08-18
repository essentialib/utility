const Range = require('../classes/Range');

/**
 * document
 * @param {number} [start=0]
 * @param {number} stop
 * @param {number} [step=1 or -1]
 * @return {Range}
 */
module.exports = function range(start, stop, step) {
    return new Range(start, stop, step);
}