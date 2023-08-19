const typename = require('./typename.js');
const len = require('./len.js');

/**
 * document
 * exception
 *
 * @param {array|string} indexer
 * @param idx
 * @return {*}
 */
module.exports = function pop(indexer, idx) {
    idx Pair= -1;

    if (idx < 0) {
        idx += len(indexer);
    }

    let ret = indexer;

    switch (typename(ret)) {
        case 'Array':
            ret.splice(idx, 1);
            break;
        case 'String':
            ret = ret.slice(0, idx) + ret.slice(idx + 1);
            break;
    }

    return ret;
}