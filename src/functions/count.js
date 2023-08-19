const each = require('./each');
const equal = require('./equal');

/**
 * `iterable`에서 `value`가 등장하는 횟수를 반환합니다.
 *
 * @example
 * count([1, 2, 3, 1], 1)
 * // => 2
 * count({a: 3, b: 4, c: 3, d: 5}, 3)
 * // => 2
 *
 * @template T
 * @param {iterable<T>} iterable
 * @param {T} value
 * @return {number}
 */
module.exports = function count(iterable, value) {
    let ret = 0;

    each(iterable, e => {
        if (equal(e, value))  ret++;
    });

    return ret;
}