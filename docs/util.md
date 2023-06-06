# chain
```js
_(this).chain(callbackfn)
```
Essential_old 함수를 체이닝으로 사용할 수 있게 해주는 함수입니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `*` | 체이닝을 시작할 대상 객체 |
| callbackfn | `Function` | 체이닝 콜백 함수, 첫 번째 인자로 Essential_old 객체를 받습니다. |

**Returns**  
| type | description |
|------|-------------|
| `*` | 체이닝 콜백 함수의 반환값 |

**Examples**
```js
let obj = [{a: 1}, {a: 2}, {a: 3}];

_(obj).chain(v =>
   v.map(e => e.a).filter(e => e > 1)
) // [2, 3]

let person = [
  {name: 'John', age: 21},
  {name: 'Jane', age: 22},
  {name: 'Mary', age: 23},
];

_(person).chain(v =>
   v.map(o => o.name).filter(n => n.startsWith('J')).head()
) // 'John'
```

# equal
```js
_.equal(item1, item2)
```
두 값이 같은지 비교합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| item1 | `*` | 비교할 값 |
| item2 | `*` | 비교할 값 |

**Returns**  
| type | description |
|------|-------------|
| `Boolean` | 두 값이 같으면 true, 다르면 false |

**Examples**
```js
_.equal([1, [2, 3, {'a': 7}]], [1, [2, 3, {'a': 7}]]); // true
_.equal([1, [2, 3, {'a': 7}]], [1, [2, 3, {'a': 8}]]); // false
```

# isOf
```js
_(this).isOf(typef)
```
객체의 타입이 `typef`와 같은지 여부를 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `*` | wrap 객체 |
| typef | `Function` | 타입을 확인할 함수, 생성자 함수여야 합니다. |

**Returns**  
| type | description |
|------|-------------|
| `Boolean` | 객체의 타입이 `typef`와 같은지 여부 |

**Examples**
```js
_([1, 2, 3]).isOf(Array); // true
_([1, 2, 3]).isOf(String); // false
```

# len
```js
_.len(item)
```
`item`의 길이를 반환합니다. Object는 key의 개수를, Set과 Map은 size를, Array와 String은 length를, Number는 자릿수를 반환합니다. 그 외 타입의 객체는 size 또는 length 속성을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| item | `*` | 길이를 구할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `Number \| undefined` | `item`의 길이를 반환합니다. |

**Examples**
```js
_.len([1, 2, 3]); // 3
_.len({a: 1, b: 2, c: 3}); // 3
_.len(new Set([1, 2, 3])); // 3
_.len(new Map([['a', 1], ['b', 2], ['c', 3]])); // 3
_.len('abc'); // 3
_.len(123); // 3
```

# pretty
```js
_.pretty(item, [maxLength=18])
```
임의의 객체를 예쁘게 출력한 문자열을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| item | `*` | 출력할 객체  |
| [maxLength=18] | `Number` | 한 줄의 최대 길이 |

**Returns**  
| type | description |
|------|-------------|
| `String` | `item`을 예쁘게 출력한 문자열을 반환합니다. |

**Examples**
```js
_.pretty([1, 2, 3]); // [1, 2, 3]
_.pretty({a: 1, b: 2, c: 3}); // {a: 1, b: 2, c: 3}
_.pretty(new Set([1, 2, 3])); // Set {1, 2, 3}
```

# range

```js
_.range([start = 0], stop, [step = 1])
```
start부터 end까지 step만큼 증가하는 배열을 반환한다.

**Parameters**
| name | type | description |
|------|------|-------------|
| [start=0] | `Number` | 시작값 |
| end | `Number` | 끝값 |
| [step=1] | `Number` | 증가값, 음수면 감소 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | start부터 end까지 step만큼 증가하는 배열 |

**Examples**
```js
_.range(5); // [0, 1, 2, 3, 4]
_.range(1, 5); // [1, 2, 3, 4]
_.range(1, 10, 2); // [1, 3, 5, 7, 9]
_.range(10, 1, -2); // [10, 8, 6, 4, 2]
```

# type
```js
_.typename(obj)
```
객체의 타입 이름을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| obj | `*` | 타입 이름을 구할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `String` | `obj`의 타입 이름 |

**Examples**
```js
_.typename(null); // 'null'
_.typename(undefined); // 'undefined'
_.typename(1); // 'number'
_.typename(''); // 'string'
_.typename(true); // 'boolean'
_.typename({}); // 'object'
_.typename([]); // 'array'
_.typename(new Set()); // 'set'
_.typename(new Map()); // 'map'
_.typename(new Date()); // 'date'
_.typename(/a/); // 'regexp'
_.typename(Symbol()); // 'symbol'
_.typename(function() {}); // 'function'
_.typename(new Error()); // 'error'
```