const Pattern = require('../src/pattern.js');

// /^(?<timestamp>\d+),(?<author>.+)$/
const regex = Pattern(_ => _
        .find(_ => _.find('abc'))
,)

console.log(regex.toRegExp())