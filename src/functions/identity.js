/**
 * 상수 함수입니다. `item`을 그대로 반환합니다.
 *
 * @example
 * identity(1);
 * // => 1
 * identity('abc');
 * // => abc
 *
 * @template T
 * @param {T} item 임의의 값
 * @return {T} `item`을 그대로 반환합니다.
 */
module.exports = function identity(item) {
    return item;
}