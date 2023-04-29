const type = require('./type.js');

/**
 * `item`의 길이를 반환합니다. Object는 key의 개수를, Set과 Map은 size를, Array와 String은 length를, Number는 자릿수를 반환합니다. 그 외 타입의 객체는 size 또는 length 속성을 반환합니다.
 * @param {*} item 길이를 구할 객체
 * @returns {Number | undefined} `item`의 길이를 반환합니다.
 * @example
 * len([1, 2, 3]); // 3
 * len({a: 1, b: 2, c: 3}); // 3
 * len(new Set([1, 2, 3])); // 3
 * len(new Map([['a', 1], ['b', 2], ['c', 3]])); // 3
 * len('abc'); // 3
 * len(123); // 3
 */

function len(item) {
	if (item == null) return undefined;

	switch (type(item)) {
		case "object":
			return Object.keys(item).length;
		case "set":
		case "map":
			return item.size;
		case "array":
		case "string":
			return item.length;
		case "number":
			return Math.floor(Math.log10(item)) + 1;
		default:
			if (item.size !== undefined) return item.size;
            else if (item.length !== undefined) return item.length;
            else return undefined;
	}
};

module.exports = len;