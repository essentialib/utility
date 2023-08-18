const isNumber = require('./isNumber');
const isString = require('./isString');
const isBoolean = require('./isBoolean');
const isNull = require('./isNull');
const isUndefined = require('./isUndefined');
const isArray = require('./isArray');
const isObject = require('./isObject');
const isMap = require('./isMap');
const isSet = require('./isSet');
const isFunction = require('./isFunction');
const isSymbol = require('./isSymbol');
const isRegExp = require('./isRegExp');
const isDate = require('./isDate');

/**
 * document
 * @param item
 * @param maxLength
 * @return {*}
 */
module.exports = function pretty(item, maxLength) {
    maxLength ||= 18;

    let str = '';

    if (isNumber(item)) {
        str = item.toString();
    } else if (isString(item)) {
        str = "'" + item + "'";
    } else if (isBoolean(item)) {
        str = item ? 'true' : 'false';
    } else if (isNull(item)) {
        str = 'null';
    } else if (isUndefined(item)) {
        str = 'undefined';
    } else if (isArray(item)) {
        str = item.map(v => pretty(v, maxLength)).join(', ');
        str = '[ ' + str + ' ]';
    } else if (isObject(item)) {
        for (let key in item) {
            str += pretty(key, maxLength) + ': ' + pretty(item[key], maxLength) + ', ';
        }
        str = '{ ' + str.slice(0, -2) + ' }';
    } else if (isMap(item)) {
        item.forEach((v, k) => {
            str += pretty(k, maxLength) + ' => ' + pretty(v, maxLength) + ', ';
        });
        str = '{ ' + str.slice(0, -2) + ' }';
    } else if (isSet(item)) {
        item.forEach(v => {
            str += pretty(v, maxLength) + ', ';
        });
        str = '{ ' + str.slice(0, -2) + ' }';
    } else if (isFunction(item)) {
        str = item.toString().replace(/\n/g, '').replace(/\s+/g, ' ');
    } else if (isSymbol(item)) {
        str = item.toString();
    } else if (isRegExp(item)) {
        str = item.toString();
    } else if (isDate(item)) {
        str = item.toJSON();
    } else str = item.toString();

    return str;
}