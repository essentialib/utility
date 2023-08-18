const len = require('./len');
const range = require('./range');
const isObject = require('./isObject');
const isArray = require('./isArray');

/**
 * document
 *
 * @alias f
 * @param str
 * @return {*|string}
 */
module.exports = function format(str) {
    let args = Array.from(arguments);
    args.shift();

    if (len(args) === 0)
        return str;

    if (isObject(args[0]) && len(args) === 1) {
        args = args[0];

        return str.split('{{}}')
            .map(e => e.replace(/{([_$a-zA-Z][_$\w]*)}/g, (_, group) => {
                return args[group];
            })).join('{}');
    } else {
        if (isArray(args[0]) && len(args) === 1)
            args = args[0];

        let auto = false;
        let acc = 0;

        return str.split('{{}}')
            .map(e => e.replace(/{(\d*)}/g, (_, group) => {
                if (group === '') {
                    if (auto === false && acc !== 0)
                        throw new Error('cannot mix automatic and manual numbering');

                    auto = true;
                    return args[acc++];
                } else {
                    if (auto)
                        throw new Error('cannot mix automatic and manual numbering');

                    acc = parseInt(group);
                    if (acc >= len(args))
                        throw new RangeError('index (' + acc + ') out of range ' + range(0, len(args)));
                    return args[acc];
                }
            })).join('{}');
    }
}