const flattenDepth = require('./flattenDepth');

/**
 * 
 * @param item
 * @return {*}
 */
module.exports = function flattenAll(item) {
    return flattenDepth(item, Infinity);
}