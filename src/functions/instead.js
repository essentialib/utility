/**
 * document
 * @param item
 * @param value
 * @return {*}
 */

// todo: || 로 기본값 초기화 하는거 다 이걸로 바꾸기
module.exports = function instead(item, value) {
    return item === undefined ? value : item;
}