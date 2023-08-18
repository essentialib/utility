const every = require('./every');

/**
 * document
 * @alias every
 * @param iterable
 * @param predicate
 * @return {*}
 */
module.exports = function all(iterable, predicate) {
    return every(iterable, predicate);
}