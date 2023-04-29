const { _, equal, len, range, type } = require('./Essential.js');

var users = [
    { 'user': 'barney',  'age': 36 },
    { 'user': 'fred',    'age': 40 },
    { 'user': 'pebbles', 'age': 1 }
];

console.log(len(users));