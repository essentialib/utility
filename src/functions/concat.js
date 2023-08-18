const isArray = require('./isArray.js');
const isString = require('./isString.js');
const isNumber = require('./isNumber.js');
const len = require('./len.js');

/**
 * document
 * exception
 *
 * @param item
 * @return {*}
 */
module.exports = function concat(item) {
    let ret;

    if (isArray(item)) {
        ret = item;
        for (let i = 1; i < arguments.length; i++) {
            if (isArray(arguments[i])) {
                ret = ret.concat(arguments[i]);
            } else {
                ret.push(arguments[i]);
            }
        }
    } else if (isString(item)) {
        ret = item;
        for (let i = 1; i < arguments.length; i++) {
            ret += arguments[i].toString();
        }
    } else if (isNumber(item)) {
        ret = item;
        for (let i = 1; i < arguments.length; i++) {
            ret *= Math.pow(10, len(arguments[i]));
            ret += parseInt(arguments[i]);
        }
    }

    return ret;
}