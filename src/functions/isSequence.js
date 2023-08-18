const typename = require('./typename');

/**
 * document
 * @param item
 * @return {boolean}
 */
module.exports = function isSequence(item) {
    let typeName = typename(item);
    return typeName === 'Array' || typeName === 'String' || typeName === 'Set';
}