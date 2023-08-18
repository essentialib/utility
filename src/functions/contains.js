const includes = require('./includes.js');

/**
 *
 * @param iterable
 * @return {*}
 */
module.exports = function contains(iterable) {
    return includes.apply(null, arguments);
}