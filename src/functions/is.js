const isConstructor = require('./isConstructor.js');
const typename = require('./typename.js');
const Range = require('../classes/Range.js');
const Pair = require('../classes/Pair.js');
const Tuple = require('../classes/Tuple.js');

/**
 * document
 *
 * `item`이 `constructor`의 인스턴스인지 여부를 반환합니다.
 *  @example
 *  is([3, 4, 5], Array); // true
 *  is('abc', String); // true
 *  is(123, Number); // true
 *
 * @param {*} item 임의의 값
 * @param {function} constructor 생성자 함수
 * @returns {boolean} `item`이 `constructor`의 인스턴스인지 여부
 */
module.exports = function is(item, constructor) {
    if (isConstructor(constructor) === false) {
        throw new TypeError('`constructor`는 생성자 함수여야 합니다.');
    }

    switch (constructor) {
        case Array:
            return Array.isArray(item);
        case Boolean:
            return typeof item === 'boolean';
        case String:
            return typeof item === 'string';
        case Number:
            return typeof item === 'number';
        case Range:
            return item instanceof Range;
        case Pair:
            return item instanceof Pair;
        case Tuple:
            return item instanceof Tuple;
        case Map:
            return item instanceof Map;
        case Set:
            return item instanceof Set;
        case Date:
            return item instanceof Date;
        default:
            return typename(item) === constructor.name;
    }
}