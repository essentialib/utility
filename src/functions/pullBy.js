const identity = require('./identity');

/**
 * implement
 * @param item
 * @param [iteratee]
 */
module.exports = function pullBy(item, iteratee) {
    iteratee ||= identity;
}