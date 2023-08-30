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
const isRange = require('./isRange');
const isPair = require('./isPair');
const isTuple = require('./isTuple');
const assertFalse = require('./assertFalse');

/**
 * document
 * @param item
 * @param maxLength
 * @return {*}
 */
module.exports = function pretty(item, maxLength) {
    assertFalse(arguments.length > 2, 'pretty()는 1개 또는 2개의 인자를 받습니다.');
    
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
    } else if (isPair(item)) {
        str = '(' + pretty(item.first, maxLength) + ', ' + pretty(item.second, maxLength) + ')';
    } else if (isTuple(item)) {
        str = '(' + item.toArray().map(e => pretty(e, maxLength)).join(', ') + ')';
    } else str = item.toString();

    return str;
}