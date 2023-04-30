# add
```js
_(this).add(item, [value])
```
객체에 `item`을 추가합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | `item`을 추가할 객체 |
| item | `*` | 추가할 값(key) |
| [value] | `*` | 추가할 값(value) |

**Returns**  
| type | description |
|------|-------------|
| `Array \| String \| Object \| Set \| Map` | `item`을 this에 추가한 값 |

**Examples**
```js
_([0, 1, 2]).add(3) // [0, 1, 2, 3]
_('abc').add('d') // 'abcd'
_({ a: 1 }).add('b', 2) // { a: 1, b: 2 }
_(new Set([0, 1, 2])).add(3) // Set { 0, 1, 2, 3 }
_(new Map([['a', 1]])).add('b', 2) // Map { 'a' => 1, 'b' => 2 }
```

# compact
```js
_(this).compact()
```
falsy한 값을 제거한 배열를 반환합니다.

**Aliases**
- `truthly`

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | falsy한 값을 제거할 배열 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | 배열에서 falsy한 값이 제거된 배열 |

**Examples**
```js
_([0, false, '', null, undefined, NaN, 1, 2, 3]).compact(); // [1, 2, 3]
```

# count
```js
_(this).count(item)
```
배열에 `item`이 몇개 있는지 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| item | `*` | 개수를 세고자 하는 값 |

**Returns**  
| type | description |
|------|-------------|
| `Number` | `item`의 개수 |

**Examples**
```js
_([0, 1, 2, 3, 0, 1, 2, 3]).count(0); // 2
_('abcabc').count('a'); // 2
_({ a: 1, b: 2, c: 1 }).count(1); // 2
_(new Set([0, 1, 2, 3, 0, 1, 2, 3])).count(0); // 1
_(new Map([['a', 1], ['b', 2], ['c', 1]])).count(1); // 2
```

# countBy
```js
_(this).countBy(item, by)
```
객체에 `item`이 몇개 있는지 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| item | `*` | 개수를 세고자 하는 값 |
| by | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key) |

**Returns**  
| type | description |
|------|-------------|
| `Number` | `item`의 개수 |

**Examples**
```js
_({ a: 1, b: 2, c: 1 }).countBy(e => e == 1); // 2
_([{x: 2}, {x: 4}, {x: 2}]).countBy(v => v.x == 2); // 2
```

# each
```js
_(this).each(viewer)
```
각 요소에 대해 반환값이 없는 `viewer` 함수를 실행합니다.

**Aliases**
- `forEach`

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| viewer | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key) |

**Returns**  
| type | description |
|------|-------------|
| `undefined` | 반환값이 없습니다. |

**Examples**
```js
_([1, 2, 3]).each(e => console.log(e)); // 1 2 3
_('abc').each(e => console.log(e)); // a b c
_({ a: 1, b: 2, c: 3 }).each((v, k) => console.log(v, k)); // 1 'a' 2 'b' 3 'c'
_(new Set([1, 2, 3])).each(e => console.log(e)); // 1 2 3
_(new Map([['a', 1], ['b', 2], ['c', 3]])).each((v, k) => console.log(v, k)); // 1 'a' 2 'b' 3 'c'
```

# every
```js
_(this).every(condition)
```
배열의 모든 요소가 조건을 만족하는지 확인합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| condition | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key) |

**Returns**  
| type | description |
|------|-------------|
| `Boolean` | 모든 요소가 조건을 만족하면 `true`, 아니면 `false` |

**Examples**
```js
_([1, 2, 3]).every(e => e > 0); // true
_('abc').every(e => e > 'a'); // false
_({ a: 1, b: 2, c: 3 }).every((v, k) => v > 0); // true
```

# filter
```js
_(this).filter(condition)
```
객체의 요소를 조건에 맞게 필터링합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| condition | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key) |

**Returns**  
| type | description |
|------|-------------|
| `Set \| String \| Array \| Map \| Object` | 조건에 맞는 요소들로 이루어진 객체 |

**Examples**
```js
_([1, 2, 3]).filter(e => e > 1); // [2, 3]
_('abc').filter(e => e > 'a'); // 'bc'
_({ a: 1, b: 2, c: 3 }).filter((v, k) => v > 1); // { b: 2, c: 3 }
```

# filterNot
```js
_(this).filterNot(condition)
```
객체에서 조건에 맞지 않는 요소들을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| condition | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key) |

**Returns**  
| type | description |
|------|-------------|
| `Set \| String \| Array \| Map \| Object` | 조건에 맞지 않는 요소들로 이루어진 객체 |

**Examples**
```js
_([1, 2, 3]).filterNot(e => e > 1); // [1]
_('abc').filterNot(e => e > 'a'); // 'a'
_({ a: 1, b: 2, c: 3 }).filterNot((v, k) => v > 1); // { a: 1 }
```

# freq
```js
_(this).freq()
```
객체의 요소들의 빈도수를 반환한다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `Map` | 빈도수를 담은 객체 |

**Examples**
```js
_([0, 1, 2, 3, 0, 1, 2, 3]).freq(); // Map { 0 => 2, 1 => 2, 2 => 2, 3 => 2 }
_('abcacbc').freq(); // Map { a => 2, b => 2, c => 3 }
```

# has
```js
_(this).has(item)
```
객체에 `item`이 있는지 확인합니다.

**Aliases**
- `includes`
- `contains`

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| item | `*` | 찾을 요소 |

**Returns**  
| type | description |
|------|-------------|
| `Boolean` | `item`이 있으면 `true`, 없으면 `false` |

**Examples**
```js
_([1, 2, 3]).has(1); // true
_('abc').has('a'); // true
_({ 'a': 1, 'b': 2, 'c': 3 }).has('a'); // true
```

# items
```js
_(this).items()
```
객체의 요소들을 Item 객체(key, value 쌍)로 변환하여 반환합니다.

**Aliases**
- `pairs`

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Map` | 순회할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `Array<Item> \| Set<Item>` | 객체의 요소들을 Item 객체로 변환하여 반환합니다. 순서가 있는 객체는 Array, 없는 객체는 Set으로 반환합니다. |

**Examples**
```js
_([1, 2, 3]).items(); // [Item(0, 1), Item(1, 2), Item(2, 3)]
_('abc').items(); // [Item(0, 'a'), Item(1, 'b'), Item(2, 'c')]
_({ a: 1, b: 2, c: 3 }).items(); // Set { Item('a', 1), Item('b', 2), Item('c', 3) }
```

# keys
```js
_(this).keys()
```
객체의 키값들을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Map` | 순회할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `Set \| Array` | 키값들로 이루어진 객체, 순서가 있는 객체는 Array, 없는 객체는 Set |

**Examples**
```js
_([1, 2, 3]).keys(); // [0, 1, 2]
_('abc').keys(); // [0, 1, 2]
_({ 'a': 1, 'b': 2, 'c': 3 }).keys(); // Set { 'a', 'b', 'c' }
_((new Map([['a', 1], ['b', 2], ['c', 3]]))).keys(); // Set { 'a', 'b', 'c' }
```

# map
```js
_(this).map(transformer)
```
객체의 각 요소에 대해 주어진 함수를 호출한 결과를 모아 새로운 객체를 반환합니다.

**Aliases**
- `transform`

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| transformer | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key) |

**Returns**  
| type | description |
|------|-------------|
| `Array \| Set \| String \| Map \| Object` | 각 요소에 대해 `transformer`를 호출한 결과를 모은 배열 |

**Examples**
```js
_([1, 2, 3]).map(e => e * 2); // [2, 4, 6]
_('abc').map(e => e.toUpperCase()); // 'ABC'
_({ a: 1, b: 2, c: 3 }).map((v, k) => v * 2); // { a: 2, b: 4, c: 6 }
```

# reach
```js
_(this).reach(viewer)
```
각 요소에 대해 반환값이 없는 `viewer` 함수를 역순으로 실행합니다.

**Aliases**
- `rforEach`

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| viewer | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key) |

**Returns**  
| type | description |
|------|-------------|
| `undefined` | 아무것도 반환하지 않습니다. |

**Examples**
```js
_([1, 2, 3]).reach(e => console.log(e)); // 3, 2, 1
_('abc').reach(e => console.log(e)); // 'c', 'b', 'a'
```

# some
```js
_(this).some(condition)
```
배열의 요소 중 하나라도 조건을 만족하는지 확인합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Set \| Map` | 순회할 객체 |
| condition | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value), 두번째 인자는 인덱스(key) |

**Returns**  
| type | description |
|------|-------------|
| `Boolean` | 하나라도 조건을 만족하면 `true`, 아니면 `false` |

**Examples**
```js
_([1, 2, 3]).some(e => e > 2); // true
_('abc').some(e => e > 'b'); // true
_({ a: 1, b: 2, c: 3 }).some((v, k) => v > 2); // true
```

# values
```js
_(this).values()
```
객체의 값들을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| String \| Object \| Map \| Set` | 순회할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `Set \| Array` | 값들로 이루어진 객체, 순서가 있는 객체는 Array, 없는 객체는 Set |

**Examples**
```js
_([1, 2, 3]).values(); // [1, 2, 3]
_('abc').values(); // ['a', 'b', 'c']
_({ 'a': 1, 'b': 2, 'c': 3 }).values(); // Set { 1, 2, 3 }
```