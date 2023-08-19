/**
 * `item`의 타입 이름을 반환합니다.
 *
 * @example
 * typename(1);
 * // => Number
 * typename('abc');
 * // => String
 * typename([1, 2, 3]);
 * // => Array
 *
 * @param {any} item 임의의 값
 * @returns {string} `item`의 타입 이름
 */
module.exports = function typename(item) {
    if (item === null) return 'null'; else if (item === undefined) return 'undefined';

    let typeofString = typeof item;
    if (typeofString !== "object") return (typeofString)[0].toUpperCase() + (typeofString).slice(1);

    let objectString = Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
    if (objectString !== "object") return objectString[0].toUpperCase() + objectString.slice(1);

    let constructorString = item.constructor.toString();
    return constructorString.substring(9, constructorString.indexOf("("));
}