const len = require('./len.js');

/**
 * document
 * 배열의 [start, end) 구간에서 step만큼 건너뛴 배열을 반환합니다. Python의 slice 문법과 일치합니다.
 * @example
 *
 * @param {string|array} item 배열, 혹은 유사 배열(유사 배열도 slice 결과는 배열로 리턴됩니다.)
 * @param {Number} [start=0] 시작 인덱스, 음수일 경우 배열의 끝에서부터 센 인덱스
 * @param {Number} [end=length] 끝 인덱스, 음수일 경우 배열의 끝에서부터 센 인덱스
 * @param {Number} [step=1] 건너뛸 간격
 * @returns {Array} 배열의 [start, end) 구간에서 step만큼 건너뛴 배열
 */
module.exports = function slice(item, start, end, step) {
    let length = len(item);

    if (start == null || start < -length)
        start = 0;
    else if (start < 0)
        start = length + start;
    else if (start > length)
        start = length;

    if (end == null || end < -length)
        end = length;
    else if (end < 0)
        end = length + end;
    else if (end > length)
        end = length;

    step ||= 1;

    if (step === 0) throw new Error("Step cannot be 0");

    let ret = [];
    if (start > end && step < 0) {
        for (let i = start; i > end; i += step) {
            ret[ret.length] = item[i];
        }
    } else if (start < end && step > 0) {
        for (let i = start; i < end; i += step) {
            ret[ret.length] = item[i];
        }
    }

    return ret;
}