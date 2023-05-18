function Essential(wrapped) {
    Object.defineProperty(this, 'chaining', {
        value: false,
        writable: false
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

    pair(first, second, firstName, secondName) {
        firstName ||= 'first';
        secondName ||= 'second';

        let ret = {};
        ret[firstName] = first;
        ret[secondName] = second;

        return ret;
    },

    hashPair(key, value) {
        return $.pair(key, value, 'key', 'value');
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
        if (item === null)
            return 'null';
        else if (item === undefined)
            return 'undefined';

        let typeofString = typeof item;
        if (typeofString !== "object")
            return (typeofString)[0].toUpperCase() + (typeofString).slice(1);

        let objectString = Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
        if (objectString !== "object")
            return objectString[0].toUpperCase() + objectString.slice(1);

        let constructorString = item.constructor.toString();
        return constructorString.substring(9, constructorString.indexOf("("));
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
     *  $.instanceof([3, 4, 5], Array); // true
     *  $.instanceof('abc', String); // true
     *  $.instanceof(123, Number); // true
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

    getIterator(item) {
        if ($.isIterable(item) === false) {
            throw new TypeError(item + ' is not iterable');
        }

        if (!$.isHashTable(item))
            return item[Symbol.iterator]();

        if ($.isObject(item))
            return function () {
                const keys = Object.keys(item);
                let index = 0;

                return {
                    next() {
                        if (index < keys.length) {
                            return { value: $.hashPair(item[keys[index]], keys[index++]), done: false };
                        } else {
                            return { done: true };
                        }
                    }
                }
            }();
        else
            return function () {
                const items = Array.from(item);
                let index = 0;

                return {
                    next() {
                        if (index < items.length) {
                            return { value: $.hashPair(items[index][0], items[index++][1]), done: false };
                        } else {
                            return { done: true };
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
                    return a.source === b.source &&
                        a.global === b.global &&
                        a.ignoreCase === b.ignoreCase &&
                        a.multiline === b.multiline;
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
                if (item == null) return undefined;
                else if ('size' in item) return item.size;
                else if ('length' in item) return item.length;
                else return undefined;
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

    each(iterable, iteratee) {
        if (!$.isIterable(iterable)) {
            throw new TypeError(iterable + ' is not iterable');
        }

        let iterator = $.getIterator(iterable);

        for (let next = iterator.next(), idx = 0; next.done === false; next = iterator.next(), idx++) {
            if ($.isHashTable(iterable)) {
                next.value = [next.value.value, next.value.key];
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

        if ($.isArray(iterable)) {

        }
        let ret = [];
        $.each(iterable, (...args) => {
            ret.push(iteratee.apply(null, args));
        });
        return ret;
    },

    zip() {

    },

    unzip() {

    },

    associate
});

for (let key in $) {
    Essential.prototype[key] = function () {
        let args = Array.from(arguments);
        args.unshift(this.value());
        return new Essential($[key].apply(null, args));
    }
}

module.exports = $;

o = {a: 1, b: 2, c: 3, d: 4, e: 5};
m = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);
$.each(m, (v, k) => console.log(v, k));