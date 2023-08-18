const len = require('./len');

/**
 * document
 * @param item
 * @return {boolean}
 */
module.exports = function isEmpty(item) {
    return len(item) === 0;
}