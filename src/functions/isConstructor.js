/**
 * document
 * exception
 *
 * @param item
 * @return {boolean}
 */
module.exports = function isConstructor(item) {
    return !!item.prototype && !!item.prototype.constructor.name;
}