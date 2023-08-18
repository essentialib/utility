const isSequence = require('./isSequence');

/**
 * `sequence`의 요소가 key가 되고, 각 요소를 `valueSelector`에 대입해서 반환된 값을 value로 하는 Map을 만듭니다.
 * @example
 * associateToKey([72, 69, 76, 76, 79], String.fromCharCode) // { 72 => 'H', 69 => 'E', 76 => 'L', 79 => 'O' }
 * associateToKey('abc', e => e.charCodeAt(0)) // { 'a' => 97, 'b' => 98, 'c' => 99 }
 *
 * @template T, V
 * @param {sequence<T>} sequence
 * @param {function(T): V} valueSelector
 * @return {Map<T, V>}
 */
module.exports = function associateToKey(sequence, valueSelector) {
    if (!isSequence(sequence)) {
        throw new TypeError(sequence + ' is not sequence');
    }

    // todo: 구현
}