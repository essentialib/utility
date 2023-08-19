const push = require('./push');

/**
 * 
 * @param item
 * @param values
 * @return {*}
 */
module.exports = function pushAll(item, values) {
    return push.apply(null, [item].concat(values));
}