const identity = require('./identity');

/**
 *
 * @param item
 * @param [iteratee]
 */
module.exports = function pushBy(item, iteratee) {
    iteratee ||= identity;
}