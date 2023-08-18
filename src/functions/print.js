const isObject = require('./isObject');
const at = require('./at');
const pretty = require('./pretty');
const chunk = require('./chunk');
const balancedChunk = require('./balancedChunk');
const isNumber = require('./isNumber');
const pop = require('./pop');

/**
 * document
 */
module.exports = function print() {
    let str = '';
    let args = Array.from(arguments);
    let config = {
        'sep': ' ', 'start': '', 'end': '', 'maxLength': null, 'balanced': false,
        'outputfn': x => console.log(x) // fixme: 카카오톡 봇 용으로 배포할 땐 또 바꿔야함
    };

    if (isObject(at(arguments, -1))) {
        cfg = at(arguments, -1);
        config.sep = cfg.sep || config.sep;
        config.end = cfg.stop || config.end;
        config.maxLength = cfg.maxLength || config.maxLength;
        config.balanced = cfg.balanced || config.balanced;
        config.outputfn = cfg.outputfn || config.outputfn;

        args = pop(args);
    }

    for (let i = 0; i < args.length; i++) {
        str += pretty(args[i]) + config.sep;
    }
    str = config.start + str.slice(0, -config.sep.length) + config.end;

    if (isNumber(config.maxLength)) {
        if (config.balanced === true) {
            str = balancedChunk(str, config.maxLength).join('\n');
        } else {
            str = chunk(str, config.maxLength).join('\n');
        }
    }

    config.outputfn(str);
}