const type = require('../util/type.js');

function isCyclic(input) {
    const seen = new Set();

    function dfs(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return false;
        }
        seen.add(obj);

        // FIXME: Object.entries() is not supported in KakaoTalkBot.
        return Object.entries(obj).some(([key, value]) => {
            const result = seen.has(value) ? true : isCyclic(value);
            seen.delete(result);
            return result;
        });
    }

    return dfs(input)
}

/**
 * 임의의 객체를 예쁘게 출력한 문자열을 반환합니다.
 * @param {*} item 출력할 객체 
 * @param {Number} [maxLength=18] 한 줄의 최대 길이
 * @returns {String} `item`을 예쁘게 출력한 문자열을 반환합니다.
 * @example
 * _.pretty([1, 2, 3]); // [1, 2, 3]
 * _.pretty({a: 1, b: 2, c: 3}); // {a: 1, b: 2, c: 3}
 * _.pretty(new Set([1, 2, 3])); // Set {1, 2, 3}
 */

function pretty(item, maxLength) {
    maxLength = maxLength || 18;    // 모바일 카카오톡에서 보내는 메시지 한 줄의 최대 길이가 18인 것 같네요?

    // if (isCyclic(item)) {
    //     throw new TypeError("cyclic object");
    // }

    switch (type(item)) {
        case 'number':
            return item.toString();
        case 'string':
            return '"' + item + '"';
        case 'boolean':
            return item ? 'true' : 'false';
        case 'null':
            return 'null';
        case 'undefined':
            return 'undefined';
        case 'array':
            return '[' + item.map(v => pretty(v, maxLength)).join(', ') + ']';
        case 'object':
            return '{' + Array.from(this(this(item).map((v, k) => pretty(k, maxLength) + ': ' + pretty(v, maxLength))).values()).join(', ') + '}';
        case 'map':
            return 'Map {' + Array.from(this(item).map((v, k) => pretty(k, maxLength) + ' => ' + pretty(v, maxLength)).values()).join(', ') + '}';
        case 'set':
            return 'Set {' + Array.from(this(item).map(v => pretty(v, maxLength))).join(', ') + '}';
        case 'function':
            return item.toString().replace(/\n/g, '').replace(/\s+/g, ' ');
        case 'symbol':
            return item.toString();
        case 'regexp':
            return item.toString();
        case 'date':
            return item.toJSON();
        default:
            return item.toString();
    }
}

module.exports = pretty;