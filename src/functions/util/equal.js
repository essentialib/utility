const type = require('./type.js');

/**
 * 두 값이 같은지 비교합니다.
 * @param {*} item1 비교할 값
 * @param {*} item2 비교할 값
 * @returns {Boolean} 두 값이 같으면 true, 다르면 false
 * @example
 * equal([1, [2, 3, {'a': 7}]], [1, [2, 3, {'a': 7}]]); // true
 * equal([1, [2, 3, {'a': 7}]], [1, [2, 3, {'a': 8}]]); // false
 */

function equal(item1, item2) {
    if (type(item1) !== type(item2)) {
        return false;
    } else if (item1 === item2) {
        return true;
    } else if (item1 !== item1 && item2 !== item2) {    // NaN is equal to NaN
        return true;
    } else {
        switch (type(item1)) {
            case 'date':
                return item1.getTime() === item2.getTime();
            case 'regexp':
                return item1.source === item2.source &&
                    item1.global === item2.global &&
                    item1.ignoreCase === item2.ignoreCase &&
                    item1.multiline === item2.multiline;
            case 'symbol':
                return item1.description === item2.description;
            case 'set':
                if (item1.size !== item2.size) {
                    return false;
                } else {
                    item1.forEach(e => {
                        if (!item2.has(e)) {
                            return false;
                        }
                    });
                    return true;
                }   
            case 'map':
                if (item1.size !== item2.size) {
                    return false;
                } else {
                    item1.forEach((v, k) => {
                        if (!item2.has(k) || !equal(v, item2.get(k))) {
                            return false;
                        }
                    });
                    return true;
                }
            case 'array':
                if (item1.length !== item2.length) {
                    return false;
                } else {
                    for (let i = 0; i < item1.length; i++) {
                        if (!equal(item1[i], item2[i])) {   
                            return false;
                        }
                    }
                    return true;
                }
            case 'object':
                if (!equal(new Set(Object.keys(item1)), new Set(Object.keys(item2)))) {
                    return false;
                } else {
                    for (let key in item1) {
                        if (!equal(item1[key], item2[key])) {
                            return false;
                        }
                    }
                    return true;
                }
            default:
                throw new TypeError('cannot compare \'' + type(item1) + '\' type.');
        }
    }
};

module.exports = equal;