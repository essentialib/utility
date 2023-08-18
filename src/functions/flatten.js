const flattenDepth = require('./flattenDepth');

/**
 *
 * @param item
 * @return {*}
 */
module.exports = function flatten(item) {
    return flattenDepth(item, 1);
}