const isSequence = require('./isSequence');
const each = require('./each');
const pair = require('./pair');
const Pair = require('../classes/Pair');

/**
 * `sequence`의 각 요소를 `transform`에 넣어서 반환된 값으로 새로운 객체를 만듭니다.
 * @example
 * associate([1, 2, 3], (e, i) => pair(i, e)); // { 0 => 1, 1 => 2, 2 => 3 }
 * associate('abc', (e, i) => pair(i, e)); // { 0 => 'a', 1 => 'b', 2 => 'c' }
 *
 * @template T, K, V
 * @param {sequence<T>} sequence 합칠 객체
 * @param {function(T, number): Pair<K, V>} transform 합칠 객체의 각 요소를 어떻게 합칠지 정의하는 함수, 반환값은 `pair`로 만들어야 합니다.
 * @returns {Map<K, V>} 합쳐진 객체
 */
module.exports = function associate(sequence, transform) {
    if (!isSequence(sequence)) {
        throw new TypeError(sequence + ' is not sequence');
    }

    let ret = new Map();
    each(sequence, (e, i) => {
        let p = transform(e, i);
        ret.set(p.first, p.second);
    });

    return ret;
}