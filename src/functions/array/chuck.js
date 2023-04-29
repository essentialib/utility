/**
 * 배열을 지정한 크기로 나눕니다.
 * @this {Array} 나눌 배열
 * @param {Number} size 배열을 나눌 크기
 * @returns {Array} 배열을 `size`개씩 나눈 배열
 * @example
 * _([1, 2, 3, 4, 5]).chunk(2); // [[1, 2], [3, 4], [5]]
 * _([1, 2, 3, 4, 5]).chunk(3); // [[1, 2, 3], [4, 5]]
 */

function chuck(size) {
	let ret = new Array();
	let start = 0;
	let end = size;

	while (start < this.wrap.length) {
		ret.push(this.wrap.slice(start, end));
		start += size;
		end += size;
	}

	return ret;
};

module.exports = chuck;