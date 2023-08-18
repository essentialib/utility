const typename = require('./typename.js');
const isConstructor = require('./isConstructor.js');

/**
 * 객체의 타입이 `constructor`와 같은지 여부를 반환합니다.
 * @this {*} wrap 객체
 * @param {Function} constructor 타입을 확인할 함수, 생성자 함수여야 합니다.
 * @returns {Boolean} 객체의 타입이 `constructor`와 같은지 여부
 * @example
 * _([1, 2, 3]).isOf(Array); // true
 * _([1, 2, 3]).isOf(String); // false
 */

function isOf(constructor) {
    if (!isConstructor.apply(new this.constructor(constructor), [])) {
        throw new TypeError(constructor.name + ' is not a constructor');
    }

    return typename(this.wrap) === constructor.name;
}

module.exports = isOf;