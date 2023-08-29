const isIterable = require('./isIterable');
const each = require('./each');
const pair = require('./pair');
const Pair = require('../classes/Pair');

/**
 * `iterable`의 각 요소를 `transform`에 넣어서 반환된 Pair 로 Map 을 만듭니다.
 *
 * @example
 * associate([1, 2, 3], (e, i) => pair(i, e));
 * // => { 0 => 1, 1 => 2, 2 => 3 }
 * associate('abc', (e, i) => pair(i, e));
 * // => { 0 => 'a', 1 => 'b', 2 => 'c' }
 *
 * @template T, K, L, R
 * @param {iterable<K, T>} iterable 합칠 객체
 * @param {function(T, K): Pair<L, R>} transform 합칠 객체의 각 요소를 어떻게 합칠지 정의하는 함수, 반환값은 `pair`로 만들어야 합니다.
 * @returns {Map<L, R>} 합쳐진 객체
 */
module.exports = function associate(iterable, transform) {
    if (!isIterable(iterable)) {
        throw new TypeError(iterable + ' is not iterable');
    }

    let ret = new Map();
    each(iterable, (e, i) => {
        let p = transform(e, i);
        ret.set(p.first, p.second);
    });

    return ret;
}