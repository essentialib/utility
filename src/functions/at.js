const len = require('./len');
const indices = require('./indices');
const _in = require('./in');
const IndexError = require('../errors/IndexError');

/**
 * document
 * @param {string|array} indexer
 * @param index
 * @return {*}
 */
module.exports = function at(indexer, index) {
    if (index < 0) {
        index += len(indexer);
    }
    
    if (_in(index, indices(indexer))) {
        throw new IndexError(indexer, index);
    }
    
    return indexer[index];
}