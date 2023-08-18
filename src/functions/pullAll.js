const pull = require('./pull');

/**
 * document
 * @param item
 * @param values
 * @return {*}
 */
module.exports = function pullAll(item, values) {
    return pull.apply(null, [item].concat(values));
}