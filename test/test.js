const E = require('../src/essential.js');

function Int(n) {
    this.n = n;
}

let person = [
    { name: '홍길동', age: 20 },
    { name: '김철수', age: 30 },
    { name: '김영희', age: 40 }
]

let number = new Int(4);

console.log(eval(E.typename(number)));