const format = require('./format');

/**
 * @param str
 * @return {*|string}
 */
module.exports = function f(str) {
    return format.apply(null, arguments);
}