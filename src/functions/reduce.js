const identity = require('./identity');

/**
 * implement
 * @example
 * reduce([1, 2, 3, 4, 5]); // 15
 * reduce([1, 2, 3, 4, 5], e => e * 2); // 30
 * reduce([1, 2, 3, 4, 5], e => e * 2, 0); // 30
 *
 * @param sequence
 * @param [iteratee]
 */
module.exports = function reduce(sequence, iteratee) {
    iteratee ||= identity;

    // todo: 구현
}