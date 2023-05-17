const typename = require("./functions/util/typename");
const defaults = {

};

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

    /**
     * `item`이 생성자 함수인지 여부를 반환합니다.
     * @example
     * $.isConstructor(Array); // true
     * $.isConstructor(String); // true
     * $.isConstructor(x => x + 2); // false
     * 
     * @param {*} item 임의의 값
     * @returns {boolean} `item`이 생성자 함수인지 여부
     */
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
    instanceof(item, constructor) {
        if ($.isConstructor(constructor) === false) {
            throw new TypeError('`constructor`는 생성자 함수여야 합니다.');
        }

        return $.typename(item) === constructor.name;
    },

    isIterable(item) {
        return $.instanceof(item, Object) || $.instanceof(item[Symbol.iterator], Function);
        // Object.entries() 가 Object[Symbol.iterator] 기능을 해주기 때문에.
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
    }
});

for (let key in $) {
    Essential.prototype[key] = function () {
        let args = Array.from(arguments);
        args.unshift(this.value());
        return new Essential($[key].apply(null, args));
    }
}

module.exports = $;