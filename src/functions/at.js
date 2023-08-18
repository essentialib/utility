const len = require('./len.js');

/**
 * document
 * @param item
 * @param index
 * @return {*}
 */
module.exports = function at(item, index) {
    if (index < 0) {
        index = len(item) + index;
    }
    return item[index];
}