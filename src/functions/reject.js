const filterNot = require('./filterNot');

/**
 * document
 * implement
 *
 * @alias filterNot
 * @param iterable
 * @param predicate
 * @return {*}
 */
module.exports = function reject(iterable, predicate) {
    return filterNot(iterable, predicate);
}