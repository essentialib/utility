const isSequence = require('./isSequence');
const associate = require('./associate');
const pair = require('./pair');

/**
 * `sequence`의 요소가 key 가 되고, 각 요소를 `valueSelector`에 대입해서 반환된 값을 value 로 하는 Map 을 만듭니다.
 *
 * @example
 * associateToValue([72, 69, 76, 76, 79], String.fromCharCode)
 * // => { 72 => 'H', 69 => 'E', 76 => 'L', 79 => 'O' }
 * associateToValue('abc', e => e.charCodeAt())
 * // => { 'a' => 97, 'b' => 98, 'c' => 99 }
 *
 * @template T, V
 * @param {sequence<T>} sequence
 * @param {function(T): V} valueSelector
 * @return {Map<T, V>}
 */
module.exports = function associateToValue(sequence, valueSelector) {
    if (!isSequence(sequence)) {
        throw new TypeError(sequence + ' is not sequence');
    }

    return associate(sequence, e => pair(e, valueSelector(e)));
}