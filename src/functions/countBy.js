const each = require('./each');

/**
 * `__content`에서 `predicate`를 만족하는 요소의 개수를 반환합니다.
 *
 * @example
 * countBy([1, 2, 3, 4, 5], e => e > 2);
 * // => 3
 * countBy('abcde', e => e === 'a');
 * // => 1
 *
 * @template T
 * @param {iterable<T>} iterable
 * @param {function(T): boolean} predicate
 * @return {number}
 */
module.exports = function countBy(iterable, predicate) {
    let ret = 0;

    each(iterable, e => {
        if (predicate(e)) ret++;
    });

    return ret;
}