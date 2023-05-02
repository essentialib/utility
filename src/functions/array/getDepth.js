/**
 * 배열의 깊이를 구한다.
 * @this {Array} 깊이를 구할 배열
 * @returns {Number} 배열의 깊이
 * @example
 * _([1, 2, 3]).getDepth(); // 1
 * _([1, [2, [3, [4]], 5]]).getDepth(); // 4
 */

// FIXME: 이거 작동 잘 안됨

function getDepth() {
    return (Array.isArray(this.wrap) ? 1 + Math.max.apply(null, this.map(getDepth)) : 0);
};

module.exports = getDepth;