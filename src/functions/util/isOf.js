const type = require('./type.js');

/**
 * 객체의 타입이 `typef`와 같은지 여부를 반환합니다.
 * @this {*} wrap 객체
 * @param {Function} typef 타입을 확인할 함수, 생성자 함수여야 합니다.
 * @returns {Boolean} 객체의 타입이 `typef`와 같은지 여부
 * @example
 * _([1, 2, 3]).isOf(Array); // true
 * _([1, 2, 3]).isOf(String); // false
 */

function isOf(typef) {
    let isConstructor = f => {
        try {
          new f();
        } catch (err) {
            return false;
        }
        return true;
    }

    if (!isConstructor(typef)) {
        throw new TypeError(typef.name + ' is not a constructor');
    }

    
    return type(this.wrap) === typef.name.toLowerCase();
}

module.exports = isOf;