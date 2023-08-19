const every = require('./every');

/**
 * `iterable`에 있는 모든 요소가 `iteratee`를 만족하는지 확인합니다.
 *
 * @example
 * all([1, 2, 3], x => x > 0);
 * // => true
 * all("abc", c => c > 'a');
 * // => false
 * all({a: 1, b: 2, c: 3}, (v, k) => v > 0);
 * // => true
 *
 * @alias every
 * @template T, K
 * @param {iterable<K, T>} iterable `iteratee`를 적용할 `iterable`입니다.
 * @param {function(T, K): boolean} [iteratee] `iterable`의 각 요소에 적용할 함수입니다. `iteratee`는 `iterable`의 요소와 키를 인자로 받습니다.
 * @return {boolean} `iterable`에 있는 모든 요소가 `iteratee`를 만족하면 `true`를 반환합니다. 그렇지 않으면 `false`를 반환합니다.
 */
module.exports = function all(iterable, iteratee) {
    return every(iterable, iteratee);
}