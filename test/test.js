const _ = require('../src/Essential.js');

let person = [
  {name: 'John', age: 21},
  {name: 'Jane', age: 22},
  {name: 'Mary', age: 23},
];

x = _(person).chain(v =>
   v.map(o => o.name).filter(n => n.startsWith('J')).head()
) // 'John'

console.log(x);