const identity = require('./identity');

/**
 * implement
 * @param item
 * @param [iteratee]
 */
module.exports = function uniqueBy(item, iteratee) {
    iteratee ||= identity;
}