const $ = require('../src/essential');

o = {a: 1, b: 2, c: 3, d: 4, e: 5};
l = [1, 2, 3, 4, 5];
m = new Map([['a', 1], ['b', 2], ['c', 3], ['d', 4], ['e', 5]]);

let pos = $.pair(3, 5);
let pos3d = $.tuple(3, 4, 5);
pos.first = 4;

$.print(pos, pos3d, o, l, m, {sep:'\n'});