const fs = require('fs');
const path = require('path');

const Range = require('./classes/Range');
const Pair = require('./classes/Pair');
const Tuple = require('./classes/Tuple');

function Essential(wrapped) {
    Object.defineProperty(this, 'chaining', {
        value: false, configurable: false
    });

    this.value = function () {
        return wrapped;
    };
}

let $ = value => new Essential(value);

$ = Object.assign($, {
    /**
     * `iterable`에 `item`이 있는지 확인합니다. `iterable`이 hashtable 인 경우, key 중에서 존재성을 확인합니다.
     * `iterable`이 range 인 경우, range 는 정수 집합을 의미하므로, `item`이 정수가 아닌 경우 포함이라고 간주하지 않음을 유의하세요.
     *
     * @example
     * in(1, [1, 2, 3])
     * // => true
     * in(4, [1, 2, 3])
     * // => false
     * in('a', 'abc')
     * // => true
     * in('a', { a: 1, b: 2, c: 3 })
     * // => true
     * in(3, range(1, 5))
     * // => true
     * in(3.5, range(1, 5))
     * // => false
     *
     *
     * @param item
     * @param iterable
     */

    // TODO
    //  - find
    //  - max
    //  - maxBy
    //  - min
    //  - minBy
    //  - sort
    //  - sortBy
    //  - at
    //  - groupBy
    //  - countBy
    //  - partition
    //  - sample
    //  - shuffle
    //  - size
    //  - print
})

// load functions
// - kkt -> java.io.File.listFiles()
    // File = java.io.File;
    // path = new File('sdcard/ChatBot/BotData/test');
    // files = Array.from(path.listFiles());
// - node.js -> fs.listDir()

fs.readdirSync(path.join(__dirname, 'functions')).forEach(f => {
    let name = f.split('.')[0];
    $[name] = require('./functions/' + name);
});

for (let key in $) {
    Essential.prototype[key] = function () {
        let args = Array.from(arguments);
        args.unshift(this.value());

        // chaining
        return new Essential($[key].apply(null, args));
    }
}

module.exports = $;