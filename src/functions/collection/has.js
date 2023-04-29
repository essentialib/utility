const type = require('../util/type.js');

/**
 * 객체에 `item`이 있는지 확인합니다.
 * @alias includes, contains
 * @this {Array | String | Object | Set | Map} 순회할 객체
 * @param {Any} item 찾을 요소
 * @returns {Boolean} `item`이 있으면 `true`, 없으면 `false`
 * @example
 * _([1, 2, 3]).has(1); // true
 * _('abc').has('a'); // true
 * _({ 'a': 1, 'b': 2, 'c': 3 }).has('a'); // true
 */

function has(item) {
    switch (type(this.wrap)) {
        case 'object':
        case 'map':
            return this.some((v, k) => this.equalf(k, item));
        default:
            return this.some(v => this.equalf(v, item));
    }
}

module.exports = has;