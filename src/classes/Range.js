function Range(start, stop, step) {
    if (step === 0) {
        throw new Error('step cannot be 0');
    }

    if (stop === undefined && step === undefined) {
        stop = start;
        start = 0;
    }
    step ||= 1;

    Object.defineProperty(this, 'start', {
        value: start,
        configurable: false
    });

    Object.defineProperty(this, 'stop', {
        value: start + step * (Math.ceil((stop - start) / step) - 1) + ((step > 0) ? 1 : -1),
        configurable: false
    });

    Object.defineProperty(this, 'step', {
        value: step,
        configurable: false
    });

    Object.defineProperty(this, 'length', {
        value: Math.max(0, Math.ceil((this.stop - this.start) / this.step)),
        configurable: false
    });
}

Range.prototype.toString = function () {
    return '(' + this.start + '...' + (this.stop-((this.step > 0) ? 1 : -1)) + ((this.step !== 1) ? ' by ' + this.step : '') + ')';
}

Range.prototype[Symbol.iterator] = function () {
    let start = this.start;
    let step = this.step;

    let i = 0;
    let len = this.length;

    return {
        next() {
            if (i === len) {
                return {
                    done: true
                };
            } else {
                let ret = {
                    value: start,
                    done: false
                };

                start += step;
                i++;

                return ret;
            }
        }
    }
}

module.exports = Range;