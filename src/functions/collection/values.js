const type = require('../util/type.js');

/**
 * 객체의 값들을 반환합니다.
 * @this {Array | String | Object | Map | Set} 순회할 객체
 * @returns {Set | Array} 값들로 이루어진 객체, 순서가 있는 객체는 Array, 없는 객체는 Set
 * @example
 * _([1, 2, 3]).values(); // [1, 2, 3]
 * _('abc').values(); // ['a', 'b', 'c']
 * _({ 'a': 1, 'b': 2, 'c': 3 }).values(); // Set { 1, 2, 3 }
 */

function values() {
    switch (type(this.wrap)) {
        case 'array':
        case 'string':
            let ret = [];
            this.each(v => ret[ret.length] = v);
            return ret;
        case 'object':
            return new Set(Object.values(this.wrap));
        case 'map':
            return new Set(this.wrap.values());
        case 'set':
            return this.wrap;
    };
}

module.exports = values;