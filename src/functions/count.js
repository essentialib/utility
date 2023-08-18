const each = require('./each');
const equal = require('./equal');

/**
 * `iterable`에서 `value`가 등장하는 횟수를 반환합니다. `value`를 입력하지 않으면 모든 요소의 빈도 맵을 반환합니다.
 *
 * @example
 * count([1, 2, 3, 1], 1)
 * // => 2
 * count([1, 2, 3, 1])
 * // => { 1 => 2, 2 => 1, 3 => 1 }
 * count({a: 3, b: 4, c: 5})
 * // => { 'a' => 1, 'b' => 1, 'c' => 1 }
 *
 * @template T
 * @param {iterable<T>} iterable
 * @param {T} [value]
 * @return {number|Map<T, number>}
 */
module.exports = function count(iterable, value) {
    if (value == null) {
        let ret = new Map();
        each(iterable, e => {
            ret.set(e, (ret.get(e) || 0) + 1);
        });

        return ret;
    } else {
        let ret = 0;
        each(iterable, e => {
            if (equal(e, value))  ret++;
        });

        return ret;
    }
}