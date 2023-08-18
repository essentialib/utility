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
     * @param item
     * @param iterable
     */
    // 예약어
    in(item, iterable) {
        // implement
    },

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
// - node.js -> fs.listDir()

for (let key in $) {
    Essential.prototype[key] = function () {
        let args = Array.from(arguments);
        args.unshift(this.value());

        // chaining
        return new Essential($[key].apply(null, args));
    }
}

module.exports = $;