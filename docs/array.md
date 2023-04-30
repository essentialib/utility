# chuck
```js
_(this).chuck(size)
```
배열을 지정한 크기로 나눕니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 나눌 배열 |
| size | `Number` | 배열을 나눌 크기 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | 배열을 `size`개씩 나눈 배열 |

**Examples**
```js
_([1, 2, 3, 4, 5]).chunk(2); // [[1, 2], [3, 4], [5]]
_([1, 2, 3, 4, 5]).chunk(3); // [[1, 2, 3], [4, 5]]
```

# flatten
```js
_(this).flatten()
```
배열을 한 번 평탄화 합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 평탄화할 배열 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | 한 번 평탄화된 배열 |

**Examples**
```js
_([1, [2, [3, [4]], 5]]).flatten(); // [1, 2, [3, [4]], 5]
_([1, [2, [3, [4]], 5]]).flatten().flatten(); // [1, 2, 3, [4], 5]
```

# flattenAll
```js
_(this).flattenAll()
```
배열을 모두 평탄화 합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 평탄화할 배열 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | 모두 평탄화된 배열 |

**Examples**
```js
_([1, [2, [3, [4]], 5]]).flattenAll(); // [1, 2, 3, 4, 5]
_([1, [2, [3, [4]], 5], 6]).flattenAll(); // [1, 2, 3, 4, 5, 6]
```

# flattenDepth
```js
_(this).flattenDepth(depth)
```
배열을 지정된 깊이만큼 평탄화 합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 평탄화할 배열 |
| depth | `Number` | 평탄화할 깊이 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | `depth`번 평탄화된 배열 |

**Examples**
```js
_([1, [2, [3, [4]], 5]]).flattenDepth(1); // [1, 2, [3, [4]], 5]
_([1, [2, [3, [4]], 5]]).flattenDepth(2); // [1, 2, 3, [4], 5]
```

# getDepth
```js
_(this).getDepth()
```
배열의 깊이를 구한다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 깊이를 구할 배열 |

**Returns**  
| type | description |
|------|-------------|
| `Number` | 배열의 깊이 |

**Examples**
```js
_([1, 2, 3]).getDepth(); // 1
_([1, [2, [3, [4]], 5]]).getDepth(); // 4
```

# pull
```js
_(this).pull([arguments])
```
배열에서 주어진 요소를 제거한 배열을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 주어진 요소를 제거할 배열 |
| [arguments] | `...*` | 제거할 요소 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | 배열에서 주어진 요소를 제거한 배열 |

**Examples**
```js
_([1, 2, 3, 4, 5]).pull(2, 4); // [1, 3, 5]
_([1, 2, 3, 4, 5, 5, 5, 5, 5]).pull(2, 4, 5); // [1, 3]
```

# pullAll
```js
_(this).pullAll(elements)
```
배열에서 주어진 요소를 제거한 배열을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 주어진 요소를 제거할 배열 |
| elements | `Array` | 제거할 요소 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | 배열에서 주어진 요소를 제거한 배열 |

**Examples**
```js
_([1, 2, 3, 4, 5]).pullAll([2, 4]); // [1, 3, 5]
_([1, 2, 3, 4, 5, 5, 5, 5, 5]).pullAll([2, 4, 5]); // [1, 3]
```

# push
```js
_(this).push([arguments])
```
배열에 주어진 값들을 추가한 후, 배열을 반환합니다.

**Aliases**
- `append`

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 값들을 추가할 배열 |
| [arguments] | `...*` | 추가할 값들 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | `arguments`가 추가된 배열 |

**Examples**
```js
_([1, 2, 3]).push(4, 5); // [1, 2, 3, 4, 5]
_([1, 2, 3]).push(4, 5, 6); // [1, 2, 3, 4, 5, 6]
```

# pushAll
```js
_(this).pushAll(args)
```
배열에 주어진 값들을 추가한 후, 배열을 반환합니다.

**Aliases**
- `appendAll`

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 값들을 추가할 배열 |
| args | `Array` | 추가할 값들 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | `args`가 추가된 배열 |

**Examples**
```js
_([1, 2, 3]).push(4, 5); // [1, 2, 3, 4, 5]
_([1, 2, 3]).push(4, 5, 6); // [1, 2, 3, 4, 5, 6]
```

# unique
```js
_(this).unique()
```
배열의 중복된 요소를 제거합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array` | 중복된 요소를 제거할 배열 |

**Returns**  
| type | description |
|------|-------------|
| `Array` | 중복된 요소가 제거된 배열 |

**Examples**
```js
_([1, 2, 3, 1, 2, 3]).unique(); // [1, 2, 3]
_(['a', 'b', 'c', 'a', 'b', 'c']).unique(); // ['a', 'b', 'c']
```

# uniqueBy
```js
uniqueBy(by)
```
배열의 `by` 함숫값이 중복된 요소를 제거합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| by | `Function` | 요소마다 호출할 함수, 첫 번째 인수에는 요소가 전달됩니다. |

**Returns**  
| type | description |
|------|-------------|
| `Array` | 중복된 요소가 제거된 배열 |

**Examples**
```js
_([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).uniqueBy(v => v % 2); // [1, 2]
_([1.1, 1.2, 2.1, 2.2, 3.1, 3.2]).uniqueBy(Math.floor); // [1.1, 2.1, 3.1]
_([{ a: 1 }, { a: 2 }, { a: 1 }]).uniqueBy(v => v.a); // [{ a: 1 }, { a: 2 }]
```