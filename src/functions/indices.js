const hasIndex = require('./hasIndex');

/**
 * implement
 * `indexer`의 인덱스 범위를 반환합니다.
 *
 * @example
 * indices([1, 2, 3]);
 * // => (0...2)
 * indices('abcdef');
 * // => (0...5)
 *
 * @param {string|array} indexer 인덱스가 있는 객체
 * @return {Range} 인덱스 범위
 */
module.exports = function indices(indexer) {
    if (!hasIndex(indexer)) {
        throw new TypeError(indexer + ' has no index');
    }
}