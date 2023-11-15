const is = require('./is');
const isConstructor = require('./isConstructor');
const len = require('./len');
const all = require('./all');

/**
 * document
 *
 * @examples
 * $.isTypes([1, 2, 3], Number, Number, Number);
 * // => true
 * $.isTypes([1, 2, 3], Number, 'Any', Number);
 * // => true
 * $.isTypes([1, 2, 3], Number, Number, String);
 * // => false
 *
 * @template T
 * @param {indexer<T>} item
 * @param {...*} arguments
 * @return {boolean}
 */
module.exports = function isTypes(item) {
    let args = Array.from(arguments).slice(1);

    return len(item) === len(args) && all(args, (arg, i) =>
        arg === 'Any' ? true : isConstructor(arg) && is(item[i], arg)
    );
}