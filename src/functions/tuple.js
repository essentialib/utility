const Tuple = require('../classes/Tuple');

/**
 * `arguments`를 쌍으로 묶습니다.
 *
 * @example
 * $.tuple(3, 'a', true)
 * // => (3, 'a', true)
 * $.tuple('a', 'b', 'c')
 * // => ('a', 'b', 'c')
 *
 * let a = $.tuple(3, 'a', true);
 * a.get(0);
 * // => 3
 * a.get(1);
 * // => a
 * a.get(2);
 * // => true
 * a.length;
 * // => 3
 *
 * @param {any} arguments
 * @return {Tuple}
 */
module.exports = function tuple() {
    return new Tuple(Array.from(arguments));
}