const typename = require('./typename');

/**
 * document
 * @example
 * equal(1, 1); // true
 * equal({'a': 3, 'b': 7}, {'b': 7, 'a': 3}, {'a': 3, 'b': 7}); // true
 * equal(new Set([1, 2, 3]), new Set([3, 2, 1]), new Set([2, 3, 1])); // true
 *
 * @param {...any} arguments
 * @return {boolean}
 */
// compat: 새로운 클래스가 생길 때마다 추가해야 함
module.exports = function equal() {
    function _equal(a, b) {
        if (typename(a) !== typename(b)) {
            return false;
        } else if (a === b) {
            return true;
        } else if (a !== a && b !== b) {    // NaN !== NaN을 이용
            return true;
        } else {
            switch (typename(a)) {
                case 'Number':
                case 'String':
                    return a === b;
                case 'Date':
                    return a.getTime() === b.getTime();
                case 'RegExp':
                    return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
                case 'Symbol':
                    return a.description === b.description;
                case 'Set':
                    if (a.size !== b.size) {
                        return false;
                    } else {
                        a.forEach(e => {
                            if (!b.has(e)) {
                                return false;
                            }
                        });
                        return true;
                    }
                case 'Map':
                    if (a.size !== b.size) {
                        return false;
                    } else {
                        a.forEach((v, k) => {
                            if (!b.has(k) || !_equal(v, b.get(k))) {
                                return false;
                            }
                        });
                        return true;
                    }
                case 'Array':
                    if (a.length !== b.length) {
                        return false;
                    } else {
                        for (let i = 0; i < a.length; i++) {
                            if (!_equal(a[i], b[i])) {
                                return false;
                            }
                        }
                        return true;
                    }
                case 'Object':
                    if (!_equal(new Set(Object.keys(a)), new Set(Object.keys(b)))) {
                        return false;
                    } else {
                        for (let key in a) {
                            if (!_equal(a[key], b[key])) {
                                return false;
                            }
                        }
                        return true;
                    }
                case 'Pair':
                    return _equal(a.first, b.first) && _equal(a.second, b.second);
                case 'Tuple':
                    return a.length === b.length && _equal(a.toArray(), b.toArray());
                case 'Range':
                    return _equal(a.start, b.start) && _equal(a.end, b.end) && _equal(a.step, b.step);
                default:
                    throw new TypeError('cannot compare \'' + typename(a) + '\' type.');
            }
        }
    }

    return Array.from(arguments).reduce((acc, cur, _, arr) => acc & _equal(arr[0], cur), true);
}