const $ = require('../src/essential');
const _ = require('@essentialib/lodash');

o = {a: 1, b: 2, c: 3, d: 4, e: 5};
l = [1, 2, 3, 4, 5, 2, 3, 4];
m = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);

let pos = $.pair(3, 5);
let pos3d = $.tuple(3, 4, 5);
pos.first = 4;
$.print()

let r = $.range(-10, -100, -4);
$.print($.format('r is from {start} to {stop} with step {step}', {start:r.start, stop:r.stop, step:r.step}));