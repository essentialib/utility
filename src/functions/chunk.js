const len = require('./len');
const slice = require('./slice');

/**
 * document
 * @param {any} item
 * @param size
 * @return {*[]}
 */
module.exports = function chuck(item, size) {
    if (size <= 0) {
        throw new Error('`size`는 0보다 커야 합니다.');
    }

    let ret = [];
    let start = 0;
    let end = size;

    while (start < len(item)) {
        ret.push(slice(item, start, end));

        start += size;
        end += size;
    }

    return ret;
}