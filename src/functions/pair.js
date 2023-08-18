const Pair = require('../classes/Pair');

/**
 * `first`와 `second`를 쌍으로 묶습니다.
 *
 * @example
 * $.pair(3, 'a');
 * // => (3, 'a')
 * $.pair('a', 'b');
 * // => ('a', 'b')
 *
 * let a = $.pair(3, 'a');
 * a.first;
 * // => 3
 * a.second;
 * // => a
 *
 * @template A, B
 * @param {A} first
 * @param {B} second
 * @return {Pair<A, B>}
 */
module.exports = function pair(first, second) {
    return new Pair(first, second);
}