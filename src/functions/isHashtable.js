const typename = require('./typename.js');

/**
 * document
 * @param item
 * @return {boolean}
 */
module.exports = function isHashtable(item) {
    let typeName = typename(item);
    return typeName === 'Object' || typeName === 'Map';
}