const len = require("./functions/util/len");
const typename = require("./functions/util/typename");

function Essential(wrapped, outputfn) {
    Object.defineProperty(this, 'chaining', {
        value: false, configurable: false
    });

    this.value = function () {
        return wrapped;
    };
}

$ = value => new Essential(value);

$ = Object.assign($, {
    /**
     * 상수 함수입니다. `item`을 그대로 반환합니다.
     * @example
     * $.identity(1); // 1
     * $.identity('abc'); // 'abc'
     *
     * @param {*} item 임의의 값
     * @returns {*} `item`을 그대로 반환합니다.
     */
    identity(item) {
        return item;
    },

    pair(first, second) {
        function Pair() {
            Object.defineProperty(this, 'first', {
                value: first, configurable: false
            });

            Object.defineProperty(this, 'second', {
                value: second, configurable: false
            });
        }

        Pair.prototype.toString = function () {
            return `(${this.first}, ${this.second})`;
        }

        return new Pair(first, second);
    },

    tuple() {
        function Tuple(args) {
            Object.defineProperty(this, 'length', {
                value: args.length, configurable: false
            });

            this.get = function (index) {
                return args[index];
            }
        }

        Tuple.prototype.toString = function () {
            let str = '(';
            for (let i = 0; i < this.length; i++) {
                str += this.get(i) + ', ';
            }
            str = str.slice(0, -2) + ')';

            return str;
        }

        return new Tuple(Array.from(arguments));
    },

    /**
     * `item`의 타입 이름을 반환합니다.
     * @example
     * $.typename(1); // 'Number'
     * $.typename('abc'); // 'String'
     * $.typename([1, 2, 3]); // 'Array'
     *
     * @param {*} item 임의의 값
     * @returns {string} `item`의 타입 이름
     */
    typename(item) {
        if (item === null) return 'null'; else if (item === undefined) return 'undefined';

        let typeofString = typeof item;
        if (typeofString !== "object") return (typeofString)[0].toUpperCase() + (typeofString).slice(1);

        let objectString = Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
        if (objectString !== "object") return objectString[0].toUpperCase() + objectString.slice(1);

        let constructorString = item.constructor.toString();
        return constructorString.substring(9, constructorString.indexOf("("));
    },

    pop(item, idx) {
        idx ||= -1;

        if (idx < 0) {
            idx += $.len(item);
        }

        let ret = item;

        switch (typename(ret)) {
            case 'Array':
                ret.splice(idx, 1);
                break;
            case 'String':
                ret = ret.slice(0, idx) + ret.slice(idx + 1);
                break;
        }

        return ret;
    },

    isNumber(item) {
        return $.typename(item) === 'Number';
    },

    isString(item) {
        return $.typename(item) === 'String';
    },

    isBoolean(item) {
        return $.typename(item) === 'Boolean';
    },

    isFunction(item) {
        return $.typename(item) === 'Function';
    },

    isObject(item) {
        return $.typename(item) === 'Object';
    },

    isArray(item) {
        return $.typename(item) === 'Array';
    },

    isDate(item) {
        return $.typename(item) === 'Date';
    },

    isRegExp(item) {
        return $.typename(item) === 'RegExp';
    },

    isSymbol(item) {
        return $.typename(item) === 'Symbol';
    },

    isSet(item) {
        return $.typename(item) === 'Set';
    },

    isMap(item) {
        return $.typename(item) === 'Map';
    },

    isNull(item) {
        return $.typename(item) === 'null';
    },

    isUndefined(item) {
        return $.typename(item) === 'undefined';
    },

    isNil(item) {
        let typename = $.typename(item);
        return typename === 'null' || typename === 'undefined';
    },

    isConstructor(item) {
        try {
            new item();
        } catch (err) {
            if (err.message.includes('is not a constructor')) {
                return false;
            }
        }
        return true;
    },

    isIterable(item) {
        return $.typename(item) === 'Object' || $.typename(item[Symbol.iterator]) === 'Function';
        // Object.entries() 가 Object[Symbol.iterator] 기능을 해주기 때문에 Object도 iterable이라고 생각함.
    },

    isSequence(item) {
        let typename = $.typename(item);
        return typename === 'Array' || typename === 'String' || typename === 'Set';
    },

    isIndexable(item) {
        let typename = $.typename(item);
        return typename === 'Array' || typename === 'String';
    },

    isHashTable(item) {
        let typename = $.typename(item);
        return typename === 'Object' || typename === 'Map';
    },

    /**
     * `item`이 `constructor`의 인스턴스인지 여부를 반환합니다.
     *  @example
     *  $.is([3, 4, 5], Array); // true
     *  $.is('abc', String); // true
     *  $.is(123, Number); // true
     *
     * @param {*} item 임의의 값
     * @param {function} constructor 생성자 함수
     * @returns {boolean} `item`이 `constructor`의 인스턴스인지 여부
     */
    is(item, constructor) {
        if ($.isConstructor(constructor) === false) {
            throw new TypeError('`constructor`는 생성자 함수여야 합니다.');
        }

        return $.typename(item) === constructor.name;
    },

    at(item, index) {
        if (index < 0) {
            index = $.len(item) + index;
        }
        return item[index];
    },

    /**
     * 배열의 [start, end) 구간에서 step만큼 건너뛴 배열을 반환합니다. Python의 slice 문법과 일치합니다.
     * @example
     *
     * @param {Array} item 배열, 혹은 유사 배열(유사 배열도 slice 결과는 배열로 리턴됩니다.)
     * @param {Number} [start=0] 시작 인덱스, 음수일 경우 배열의 끝에서부터 센 인덱스
     * @param {Number} [end=length] 끝 인덱스, 음수일 경우 배열의 끝에서부터 센 인덱스
     * @param {Number} [step=1] 건너뛸 간격
     * @returns {Array} 배열의 [start, end) 구간에서 step만큼 건너뛴 배열
     */
    slice(item, start, end, step) {
        let length = $.len(item);

        if (start == null || start < -length) start = 0; else if (start < 0) start = length + start; else if (start > length) start = length;

        if (end == null || end < -length) end = length; else if (end < 0) end = length + end; else if (end > length) end = length;

        step = step || 1;

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
    },

    getIterator(item) {
        if ($.isIterable(item) === false) {
            throw new TypeError(item + ' is not iterable');
        }

        if (!$.isHashTable(item)) return item[Symbol.iterator]();

        if ($.isObject(item)) return function () {
            const keys = Object.keys(item);
            let index = 0;

            return {
                next() {
                    if (index < keys.length) {
                        return {value: $.pair(item[keys[index]], keys[index++]), done: false};
                    } else {
                        return {done: true};
                    }
                }
            }
        }(); else return function () {
            const items = Array.from(item);
            let index = 0;

            return {
                next() {
                    if (index < items.length) {
                        return {value: $.pair(items[index][0], items[index++][1]), done: false};
                    } else {
                        return {done: true};
                    }
                }
            }
        }();
    },

    equal(a, b) {
        if ($.typename(a) !== $.typename(b)) {
            return false;
        } else if (a === b) {
            return true;
        } else if (a !== a && b !== b) {    // NaN !== NaN을 이용
            return true;
        } else {
            switch ($.typename(a)) {
                case 'Number':
                case 'String':
                    return a === b;
                case 'Date':
                    return a.getTime() === b.getTime();
                case 'RegExp':
                    return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline;
                case 'Symbol':
                    return a.description === b.description;
                case 'Set':
                    if (a.size !== b.size) {
                        return false;
                    } else {
                        a.forEach(e => {
                            if (!b.has(e)) {
                                return false;
                            }
                        });
                        return true;
                    }
                case 'Map':
                    if (a.size !== b.size) {
                        return false;
                    } else {
                        a.forEach((v, k) => {
                            if (!b.has(k) || !$.equal(v, b.get(k))) {
                                return false;
                            }
                        });
                        return true;
                    }
                case 'Array':
                    if (a.length !== b.length) {
                        return false;
                    } else {
                        for (let i = 0; i < a.length; i++) {
                            if (!$.equal(a[i], b[i])) {
                                return false;
                            }
                        }
                        return true;
                    }
                case 'Object':
                    if (!$.equal(new Set(Object.keys(a)), new Set(Object.keys(b)))) {
                        return false;
                    } else {
                        for (let key in a) {
                            if (!$.equal(a[key], b[key])) {
                                return false;
                            }
                        }
                        return true;
                    }
                default:
                    throw new TypeError('cannot compare \'' + $.typename(a) + '\' type.');
            }
        }
    },

    len(item) {
        switch ($.typename(item)) {
            case "Object":
                return Object.keys(item).length;
            case "Set":
            case "Map":
                return item.size;
            case "Array":
            case "String":
                return item.length;
            case "Number":
                return Math.floor(Math.log10(item)) + 1;
            default:
                if (item == null) return undefined; else if ('size' in item) return item.size; else if ('length' in item) return item.length; else return undefined;
        }
    },

    keys(item) {
        if (!$.isIterable(item)) {
            throw new TypeError(item + ' is not iterable');
        }

        if ($.isIndexable(item)) {
            let ret = [];
            for (let i = 0; i < item.length; i++) {
                ret.push(i);
            }
            return ret;
        } else if ($.isObject(item)) {
            return new Set(Object.keys(item));
        } else if ($.isMap(item)) {
            let ret = new Set();
            item.forEach((v, k) => {
                ret.add(k);
            });
            return ret;
        } else if ($.isSet(item)) {
            throw new TypeError('Set 타입은 `keys`를 지원하지 않습니다.');
        }
    },

    values(item) {
        if (!$.isIterable(item)) {
            throw new TypeError(item + ' is not iterable');
        }

        if ($.isObject(item)) {
            let ret = new Set();
            for (let key in item) {
                ret.add(item[key]);
            }
            return ret;
        } else if ($.isMap(item)) {
            let ret = new Set();
            item.forEach((_, k) => {
                ret.add(k);
            });
            return ret;
        } else if ($.isSet(item)) {
            return item;
        } else if ($.isIndexable(item)) {
            let ret = [];
            for (let i = 0; i < item.length; i++) {
                ret.add(item[i]);
            }
            return ret;
        }
    },

    items(item) {
        if (!$.isIterable(item)) {
            throw new TypeError(item + ' is not iterable');
        }

        let ret;

        if ($.isSet(item)) {
            throw new TypeError('Set 타입은 `items`를 지원하지 않습니다.');
        } else if ($.isSequence(item)) {
            ret = [];
            $.each(item, (v, k) => {
                ret.push($.pair(k, v));
            });
        } else if ($.isHashTable(item)) {
            ret = new Set();
            $.each(item, (v, k) => {
                ret.add($.pair(k, v));
            });
        }

        return ret;
    },

    each(iterable, iteratee) {
        if (!$.isIterable(iterable)) {
            throw new TypeError(iterable + ' is not iterable');
        }

        let iterator = $.getIterator(iterable);

        for (let next = iterator.next(), idx = 0; next.done === false; next = iterator.next(), idx++) {
            if ($.isHashTable(iterable)) {
                next.value = [next.value.second, next.value.first];
            } else {
                next.value = [next.value];
                if ($.isIndexable(iterable)) {
                    next.value.push(idx);
                }
            }

            let returnValue = iteratee.apply(null, next.value);
            if (returnValue === false) {
                break;
            }
        }
    },

    map(iterable, iteratee) {
        if (!$.isIterable(iterable)) {
            throw new TypeError(iterable + ' is not iterable');
        }

        let ret;
        if ($.isArray(iterable)) {
            ret = [];

            $.each(iterable, (e, i) => {
                ret.push(iteratee(e, i));
            });
        } else if ($.isSet(iterable)) {
            ret = new Set();

            $.each(iterable, (e, i) => {
                ret.add(iteratee(e, i));
            });
        } else if ($.isMap(iterable)) {
            ret = new Map();

            $.each(iterable, (v, k) => {
                ret.set(k, iteratee(v, k));
            });
        } else if ($.isObject(iterable)) {
            ret = {};

            $.each(iterable, (v, k) => {
                ret[k] = iteratee(v, k);
            });
        }

        return ret;
    },

    mapKeys(iterable, iteratee) {
        if (!$.isHashTable(iterable)) {
            throw new TypeError(iterable + ' is not hash table');
        }

        let ret;
        if ($.isMap(iterable)) {
            ret = new Map();

            $.each(iterable, (v, k) => {
                ret.set(iteratee(v, k), v);
            });
        } else if ($.isObject(iterable)) {
            ret = {};

            $.each(iterable, (v, k) => {
                ret[iteratee(v, k)] = v;
            });
        }

        return ret;
    },

    zip() {

    },

    unzip() {

    },

    /**
     * `iterable`의 각 요소를 `iteratee`에 넣어서 반환된 값으로 새로운 객체를 만듭니다.
     * @example
     * $.associate([1, 2, 3], (e, i) => $.pair(i, e)); // { 0 => 1, 1 => 2, 2 => 3 }
     * $.associate('abc', (e, i) => $.pair(i, e)); // { 0 => 'a', 1 => 'b', 2 => 'c' }
     *
     * @param {*} iterable 합칠 객체
     * @param {Function} iteratee 합칠 객체의 각 요소를 어떻게 합칠지 정의하는 함수, 반환값은 `$.pair`로 만들어야 합니다.
     * @returns {Map} 합쳐진 객체
     */
    associate(iterable, iteratee) {
        if (!$.isSequence(iterable)) {
            throw new TypeError(iterable + ' is not sequence');
        }

        let ret = new Map();
        $.each(iterable, (e, i) => {
            let p = iteratee(e, i);
            ret.set(p.first, p.second);
        });

        return ret;
    },

    /**
     * `iterable`의 각 요소를 `iteratee`에 넣어서 반환된 값으로 새로운 객체를 만듭니다.
     * @example
     * $.associateKeys([1, 2, 3], (e, i) => 2 * i); // { 0 => 1, 2 => 2, 4 => 3 }
     * $.associateKeys('abc', (e, i) => i + 1); // { 1 => 'a', 2 => 'b', 3 => 'c' }
     *
     * @param {*} iterable 합칠 객체
     * @param {Function} iteratee 합칠 객체의 각 요소를 어떻게 합칠지 정의하는 함수, 반환값이 키가 됩니다.
     * @returns {Map} 합쳐진 객체
     */
    associateKeys(iterable, iteratee) {
        if (!$.isSequence(iterable)) {
            throw new TypeError(iterable + ' is not sequence');
        }

        let ret = new Map();
        $.each(iterable, (e, i) => {
            ret.set(iteratee(e, i), e);
        });

        return ret;
    },

    /**
     * `iterable`의 각 요소를 `iteratee`에 넣어서 반환된 값으로 새로운 객체를 만듭니다.
     * @example
     * $.associateValues([1, 2, 3], (e, i) => 2 * i); // { 1 => 0, 2 => 2, 3 => 4 }
     * $.associateValues('abc', (e, i) => i + 1); // { 'a' => 1, 'b' => 2, 'c' => 3 }
     *
     * @param {*} iterable 합칠 객체
     * @param {Function} iteratee 합칠 객체의 각 요소를 어떻게 합칠지 정의하는 함수, 반환값이 값이 됩니다.
     * @returns {Map} 합쳐진 객체
     */
    associateValues(iterable, iteratee) {
        if (!$.isSequence(iterable)) {
            throw new TypeError(iterable + ' is not sequence');
        }

        let ret = new Map();
        $.each(iterable, (e, i) => {
            ret.set(e, iteratee(e, i));
        });

        return ret;
    },

    // TODO
    //  - balancedChunk
    //  - flatten
    //      - flatten
    //      - flattenDepth
    //      - flattenAll
    //      - getDepth
    //  - pull
    //      - pull
    //      - pullAll
    //      - pullBy
    //  - push
    //      - push
    //      - pushAll
    //      - pushBy
    //  - unique
    //      - unique
    //      - uniqueAll
    //      - uniqueBy
    //  - collection
    //     - each
    //     - map
    //     - filter
    //     - reduce
    //     - find
    //     - every
    //     - some
    //     - includes
    //     - max
    //     - maxBy
    //     - min
    //     - minBy
    //     - sort
    //     - sortBy
    //     - at
    //  - groupBy
    //  - countBy
    //  - partition
    //  - sample
    //  - shuffle
    //  - size
    //  - print


    pretty(item, maxLength) {
        // 모바일 카카오톡에서 보내는 메시지 한 줄의 최대 길이가 18인 것 같네요?
        maxLength ||= 18;

        let str = '';

        if ($.isNumber(item)) {
            str = item.toString();
        } else if ($.isString(item)) {
            str = "'" + item + "'";
        } else if ($.isBoolean(item)) {
            str = item ? 'true' : 'false';
        } else if ($.isNull(item)) {
            str = 'null';
        } else if ($.isUndefined(item)) {
            str = 'undefined';
        } else if ($.isArray(item)) {
            str = item.map(v => $.pretty(v, maxLength)).join(', ');
            str = '[ ' + str + ' ]';
        } else if ($.isObject(item)) {
            for (let key in item) {
                str += $.pretty(key, maxLength) + ': ' + $.pretty(item[key], maxLength) + ', ';
            }
            str = '{ ' + str.slice(0, -2) + ' }';
        } else if ($.isMap(item)) {
            item.forEach((v, k) => {
                str += $.pretty(k, maxLength) + ' => ' + $.pretty(v, maxLength) + ', ';
            });
            str = '{ ' + str.slice(0, -2) + ' }';
        } else if ($.isSet(item)) {
            item.forEach(v => {
                str += $.pretty(v, maxLength) + ', ';
            });
            str = '{ ' + str.slice(0, -2) + ' }';
        } else if ($.isFunction(item)) {
            str = item.toString().replace(/\n/g, '').replace(/\s+/g, ' ');
        } else if ($.isSymbol(item)) {
            str = item.toString();
        } else if ($.isRegExp(item)) {
            str = item.toString();
        } else if ($.isDate(item)) {
            str = item.toJSON();
        } else str = item.toString();

        return str;
    },

    print() {
        let str = '';
        let args = Array.from(arguments);
        let config = {
            'sep': ' ', 'start': '', 'end': '', 'maxLength': null, 'balanced': false, outputfn(x) { console.log(x); }
        };

        if ($.isObject($.at(arguments, -1))) {
            cfg = $.at(arguments, -1);
            config.sep = cfg.sep || config.sep;
            config.end = cfg.end || config.end;
            config.maxLength = cfg.maxLength || config.maxLength;
            config.balanced = cfg.balanced || config.balanced;
            config.outputfn = cfg.outputfn || config.outputfn;

            args = $.pop(args);
        }

        for (let i = 0; i < args.length; i++) {
            str += $.pretty(args[i]) + config.sep;
        }
        str = config.start + str.slice(0, -config.sep.length) + config.end;

        if ($.isNumber(config.maxLength)) {
            if (config.balanced === true) {
                str = $.balancedChunk(str, config.maxLength).join('\n');
            } else {
                str = $.chunk(str, config.maxLength).join('\n');
            }
        }

        config.outputfn(str);
    },

    chuck(item, size) {
        if (size <= 0) {
            throw new Error('size는 0보다 커야 합니다.');
        }

        let ret = [];
        let start = 0;
        let end = size;

        while (start < $.len(item)) {
            ret.push($.slice(item, start, end));

            start += size;
            end += size;
        }

        return ret;
    },
});

for (let key in $) {
    Essential.prototype[key] = function () {
        let args = Array.from(arguments);
        args.unshift(this.value());
        return new Essential($[key].apply(null, args));
    }
}

module.exports = $;