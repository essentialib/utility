const identity = require('./identity');
const map = require('./map');
const count = require('./count');

/**
 * `iterable`에 `iteratee`를 대입한 결과에서 `value`가 등장하는 횟수를 반환합니다. `value`를 입력하지 않으면 모든 요소의 빈도 맵을 반환합니다.
 *
 * @example
 * countBy([1, 2, 3, 4, 5], e => e % 2 === 0 ? 'even' : 'odd');
 * // => { 'odd' => 3, 'even' => 2 }
 * countBy([1, 2, 3, 4, 5], e => e % 2 === 0 ? 'even' : 'odd', 'odd');
 * // => 3
 *
 * @template T, V
 * @param {iterable<T>} iterable
 * @param {function(T): V} [iteratee]
 * @param {V} [value]
 * @return {number|Map<V, number>}
 */
module.exports = function countBy(iterable, iteratee, value) {
    iteratee ||= identity;

    return count(map(iterable, iteratee), value);
}