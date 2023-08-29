const len = require('./len');
const indices = require('./indices');
const _in = require('./in');
const IndexError = require('../errors/IndexError');

/**
 * document
 * @param {string|array} indexer
 * @param {number} index
 * @return {any}
 */
module.exports = function at(indexer, index) {
    if (!Number.isInteger(index)) {
        throw new TypeError(index + ' is not integer');
    }
    
    if (index < 0) {
        index += len(indexer);
    }
    
    if (_in(index, indices(indexer))) {
        throw new IndexError(indexer, index);
    }
    
    return indexer[index];
}