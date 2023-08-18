const isSequence = require('./isSequence');

/**
 * `sequence`의 요소가 value가 되고, 각 요소를 `keySelector`에 대입해서 반환된 값을 key로 하는 Map을 만듭니다.
 * @example
 * associateToValue([72, 69, 76, 76, 79], String.fromCharCode) // { 'H' => 72, 'E' => 69, 'L' => 76, 'O' => 79 }
 * associateToValue('abc', e => e.charCodeAt(0)) // { 97 => 'a', 98 => 'b', 99 => 'c' }
 *
 * @template T, K
 * @param {sequence<T>} sequence
 * @param {function(T): K} keySelector
 * @return {Map<K, T>}
 */
module.exports = function associateToValue(sequence, keySelector) {
    if (!isSequence(sequence)) {
        throw new TypeError(sequence + ' is not sequence');
    }
}