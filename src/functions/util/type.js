/**
 * 객체의 타입 이름을 반환합니다.
 * @param {*} obj 타입 이름을 구할 객체
 * @returns {String} `obj`의 타입 이름
 * @example
 * _.type(null); // 'null'
 * _.type(undefined); // 'undefined'
 * _.type(1); // 'number'
 * _.type(''); // 'string'
 * _.type(true); // 'boolean'
 * _.type({}); // 'object'
 * _.type([]); // 'array'
 * _.type(new Set()); // 'set'
 * _.type(new Map()); // 'map'
 * _.type(new Date()); // 'date'
 * _.type(/a/); // 'regexp'
 * _.type(Symbol()); // 'symbol'
 * _.type(function() {}); // 'function'
 * _.type(new Error()); // 'error'
 */

function type(obj) {
    if (obj === null) return 'null';
    else if (typeof obj !== 'object') return typeof obj;
    else if (obj.nodeType) return 'object';
    else return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

module.exports = type;