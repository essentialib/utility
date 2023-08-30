const len = require('./len');
const slice = require('./slice');
const assert = require('./assert');

/**
 * document
 * @param {string|array} indexer
 * @param {number} size
 * @return {any[]}
 */
module.exports = function chuck(indexer, size) {
    assert(size > 0, '`size`는 0보다 커야 합니다.');

    let ret = [];
    let start = 0;
    let end = size;

    while (start < len(indexer)) {
        ret.push(slice(indexer, start, end));

        start += size;
        end += size;
    }

    return ret;
}