const _ = require('../src/Essential.js');

// FIXME: 모든 `by` 함수에 대해 다음과 같은 오류가 발생합니다.
// TypeError: org.mozilla.javascript.commonjs.module.ModuleScope@2e78fee is not a function, it is object.

console.log(_([{ a: 1 }, { a: 2 }, { a: 1 }]).uniqueBy(v => v.a));