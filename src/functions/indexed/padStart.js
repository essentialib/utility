const type = require('../util/type.js');

/**
 * 객체를 `length`만큼 왼쪽으로 패딩합니다.
 * @this {Array | String} 순회할 객체
 * @param {Number} length 패딩할 길이
 * @param {*} [pad=' ', 0] 패딩할 값, 객체가 문자열이면 공백, 배열이면 0이 기본값입니다.
 * @returns {Array | String} 객체를 `length`만큼 `pad`로 채운 값
 * @example
 * _([1, 2, 3]).padStart(5); // [0, 0, 1, 2, 3]
 * _('abc').padStart(5); // '  abc'
 * _([1, 2, 3]).padStart(5, 1); // [1, 1, 1, 2, 3]
 * _('abc').padStart(5, '1'); // '11abc'
 */

function padStart(length, pad) {
    switch (type(this.wrap)) {
        case 'String':
            pad = pad || ' ';

            return this.wrap.length >= length ?
                this.wrap : (new this.constructor(pad)).repeat(length, true) + this.wrap;
        case 'Array':
            pad = pad || [0];

            return this.length >= length ?
                this.wrap : (new this.constructor(pad)).repeat(length, true).concat(this.wrap);
    }
};

module.exports = padStart;