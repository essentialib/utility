const each = require('./each');
const instead = require('./instead');

/**
 * `__content`의 빈도 맵을 반환합니다.
 *
 * @example
 * frequency([1, 2, 3, 2, 1]);
 * // => { 1 => 2, 2 => 2, 3 => 1 }
 * frequency('abcdeabc');
 * // => { 'a' => 2, 'b' => 2, 'c' => 2, 'd' => 1, 'e' => 1 }
 *
 * @template T
 * @param {iterable<T>} iterable
 * @return {Map<T, number>}
 */
module.exports = function countBy(iterable) {
    let ret = new Map();

    each(iterable, e => {
        ret.set(e, instead(ret.get(e), 0) + 1);
    });

    return ret;
}