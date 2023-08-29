const equal = require('../functions/equal');
const pretty = require('../functions/pretty');

const Collection = {
    Set: class {
        constructor(iterable) {
            this.__content = new Set();

            for (const item of iterable) {
                this.add(item);
            }
        }

        add(value) {
            if (this.has(value)) {
                throw new Error(`Value ${pretty(value)} already exists in this Set`);
            }
            this.__content.add(value);
        }

        clear() {
            this.__content.clear();
        }

        delete(value) {
            this.__content.delete(value);
        }

        entries() {
            return this.__content.entries();
        }

        forEach(callback) {
            this.__content.forEach(callback);
        }

        has(value) {
            for (const item of this.__content) {
                if (equal(item, value)) {
                    return true;
                }
            }
            return false;
        }

        keys() {
            return this.__content.keys();
        }

        values() {
            return this.__content.values();
        }

        get size() {
            return this.__content.size;
        }

        get [Symbol.toStringTag]() {
            return 'Set';
        }

        [Symbol.iterator]() {
            return this.__content[Symbol.iterator]();
        }
    }
}

