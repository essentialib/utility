const is = require('./is');
const len = require('./len');
const each = require('./each');
const identity = require('./identity');
const rangeInclude = require('./rangeInclude');
const Pair = require('../classes/Pair');
const Range = require('../classes/Range');

/**
 *
 * @example
 * sum([0, 10], k => k); // 55
 * sum([0, 10], (k, n) => k * n); // 550
 * sum(rangeInclude(0, 10), k => k); // 55
 * sum(pair(1, 10), i => sum([0, i], j => i + j)); // 660
 *
 * @param {number[2]|Range|Pair} range
 * @param {function(number, number): number} [iteratee]
 * @return {number}
 */
module.exports = function sum(range, iteratee) {
    iteratee ||= identity;

    if (!is(range, Range)) {
        if (is(range, Array) && len(range) === 2)
            range = rangeInclude(range[0], range[1]);
        else if (is(range, Pair)) {
            range = rangeInclude(range.first, range.second);
        }
    }

    let ret = 0;
    each(range, e => {
        ret += iteratee(e, range.length);
    });
}