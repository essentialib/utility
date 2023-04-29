/**
 * 객체의 타입 이름을 반환합니다.
 * @param {*} obj 타입 이름을 구할 객체
 * @returns {String} `obj`의 타입 이름
 * @example
 * type(null); // 'null'
 * type(undefined); // 'undefined'
 * type(1); // 'number'
 * type(''); // 'string'
 * type(true); // 'boolean'
 * type({}); // 'object'
 * type([]); // 'array'
 * type(new Set()); // 'set'
 * type(new Map()); // 'map'
 * type(new Date()); // 'date'
 * type(/a/); // 'regexp'
 * type(Symbol()); // 'symbol'
 * type(function() {}); // 'function'
 * type(new Error()); // 'error'
 */

function type(obj) {
    if (obj === null) return 'null';
    else if (typeof obj !== 'object') return typeof obj;
    else if (obj.nodeType) return 'object';
    else return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

module.exports = type;