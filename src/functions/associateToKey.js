const isSequence = require('./isSequence');
const associate = require('./associate');
const pair = require('./pair');
/**
 * `sequence`의 요소가 value 가 되고, 각 요소를 `keySelector`에 대입해서 반환된 값을 key 로 하는 Map 을 만듭니다.
 *
 * @example
 * associateToKey([72, 69, 76, 76, 79], String.fromCharCode)
 * // => { 'H' => 72, 'E' => 69, 'L' => 76, 'O' => 79 }
 * associateToKey('abc', e => e.charCodeAt(0))
 * // => { 97 => 'a', 98 => 'b', 99 => 'c' }
 *
 * @template T, V
 * @param {sequence<T>} sequence
 * @param {function(T): V} keySelector
 * @return {Map<V, T>}
 */
module.exports = function associateToKey(sequence, keySelector) {
    if (!isSequence(sequence)) {
        throw new TypeError(sequence + ' is not sequence');
    }
    
    return associate(sequence, e => pair(keySelector(e), e));
}