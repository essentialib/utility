const includesValue = require('./includesValue');

/**
 * @alias includesValue
 * @param hashtable
 * @return {*}
 */
module.exports = function containsValue(hashtable) {
    return includesValue.apply(null, arguments);
}