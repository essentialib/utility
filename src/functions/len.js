const typename = require('./typename');

/**
 * document
 * @param item
 * @return {number}
 */
// compat: 새로운 클래스가 생길 때마다 여기에 추가해야 함
module.exports = function len(item) {
    switch (typename(item)) {
        case "Object":
            return Object.keys(item).length;
        case "Set":
        case "Map":
            return item.size;
        case "Array":
        case "String":
            return item.length;
        case "Number":
            return Math.floor(Math.log10(item)) + 1;
        case "Pair":
            return 2;
        case "Tuple":
        case "Range":
            return item.length;
        default:
            if (item == null) return undefined;
            else if ('size' in item) {
                if (typeof item.size === 'function')
                    return item.size();
                else
                    return item.size;
            }
            else if ('length' in item) {
                if (typeof item.length === 'function')
                    return item.length();
                else
                    return item.length;
            }
            else return undefined;
    }
}