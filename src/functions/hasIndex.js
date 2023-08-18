const typename = require('./typename');

/**
 * document
 * @param item
 * @return {boolean}
 */
module.exports = function hasIndex(item) {
    let typeName = typename(item);
    return typeName === 'Array' || typeName === 'String';
}