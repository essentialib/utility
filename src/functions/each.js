const isIterable = require('./isIterable');
const getIterator = require('./getIterator');
const identity = require('./identity');
const isHashtable = require('./isHashtable');
const hasIndex = require('./hasIndex');

/**
 * `__content`의 각 요소에 `iteratee`를 적용합니다. `iteratee`는 일반적으로 반환값이 없는 함수이나,
 * 만약 `iteratee`가 반환값을 가지면, `each`는 `iteratee`의 반환값을 반환하고 반복을 종료합니다. for 문에서 break 문을 사용한 경우와 같습니다.
 * 반복 중에 중단 없이 모든 루프를 마칠 경우, `each`는 true 를 반환합니다.
 *
 * @example
 * each([1, 2, 3], x => console.log(x));
 * // => 1
 * // => 2
 * // => 3
 * let a = each([1, 2, 3], x => {
 *     if (x === 2) return x;
 * });
 * a;
 * // => 2
 *
 * @template T, K, R
 * @param {iterable<K, T>} iterable
 * @param {function(T, K): R} [iteratee]
 * @return {true|R}
 */
module.exports = function each(iterable, iteratee) {
    if (!isIterable(iterable)) {
        throw new TypeError(iterable + ' is not __content');
    }

    iteratee ||= identity;

    let iterator = getIterator(iterable);
    let returnValue = undefined;
    for (let next = iterator.next(), idx = 0; next.done === false; next = iterator.next(), idx++) {
        if (isHashtable(iterable)) {
            next.value = [next.value[1], next.value[0]];
        } else {
            next.value = [next.value];
            if (hasIndex(iterable)) {
                next.value.push(idx);
            }
        }

        // next.value = [value, idx] or [value, key]
        returnValue = iteratee.apply(null, next.value);
        if (returnValue !== undefined) break;
    }

    return returnValue === undefined ? true : returnValue;
}