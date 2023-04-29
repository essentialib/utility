const type = require('../util/type.js');

function Item(key, value) {
    this.key = key;
    this.value = value;
}

/**
 * 객체의 요소들을 Item 객체(key, value 쌍)로 변환하여 반환합니다.
 * @alias pairs
 * @this {Array | String | Object | Map} 순회할 객체
 * @returns {Array<Item> | Set<Item>} 객체의 요소들을 Item 객체로 변환하여 반환합니다. 순서가 있는 객체는 Array, 없는 객체는 Set으로 반환합니다.
 * @example
 * _([1, 2, 3]).items(); // [Item(0, 1), Item(1, 2), Item(2, 3)]
 * _('abc').items(); // [Item(0, 'a'), Item(1, 'b'), Item(2, 'c')]
 * _({ a: 1, b: 2, c: 3 }).items(); // Set { Item('a', 1), Item('b', 2), Item('c', 3) }
 */

function items() {
    let ret;

    switch (type(this.wrap)) {
        case 'array':
        case 'string':
            ret = [];
            // ex. [Item(0, 'a'), Item(1, 'b'), Item(2, 'c')]
            this.each((v, i) => {
                ret[ret.length] = new Item(i, v);
            });
            break;
        case 'object':
        case 'map':
            ret = new Set();
            // ex. new Set(Item('a', 334), Item('b', 241), Item('x', "342"))
            this.each((v, k) => {
                ret.add(new Item(k, v));
            });
            break;
    }

    return ret;
}

module.exports = items;