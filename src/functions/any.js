const some = require('./some');

/**
 * document
 * @alias some
 * @param iterable
 * @param predicate
 */
module.exports = function any(iterable, predicate) {
    return some(iterable, predicate);
}