# max
```js
_(this).max()
```
객체의 최댓값을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| Collection` | 순회할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `*` | 객체의 최댓값 |

**Examples**
```js
_([1, 2, 3]).max(); // 3
_(new Collection([1, 2, 3])).max(); // 3
```

# maxBy
```js
_(this).maxBy([by=(e => e)])
```
객체의 요소 중 `by` 함수의 반환값이 가장 큰 요소를 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| Collection` | 순회할 객체 |
| [by=(e => e)] | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value) |

**Returns**  
| type | description |
|------|-------------|
| `*` | `by` 함수의 반환값이 가장 큰 요소 |

**Examples**
```js
_([{a: 1}, {a: 2}, {a: 3}]).maxBy(v => v.a); // {a: 3}
```

# min
```js
_(this).min()
```
객체의 최솟값을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| Collection` | 순회할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `*` | 객체의 최솟값 |

**Examples**
```js
_([1, 2, 3]).min(); // 1
_(new Collection([1, 2, 3])).min(); // 1
```

# minBy
```js
_(this).minBy([by=(e => e)])
```
객체의 요소 중 `by` 함수의 반환값이 가장 작은 요소를 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| Collection` | 순회할 객체 |
| [by=(e => e)] | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value) |

**Returns**  
| type | description |
|------|-------------|
| `*` | `by` 함수의 반환값이 가장 작은 요소 |

**Examples**
```js
_([{a: 1}, {a: 2}, {a: 3}]).minBy(v => v.a); // {a: 1}
```

# product
```js
_(this).product()
```
객체의 모든 요소의 곱을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| Collection` | 순회할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `*` | 객체의 모든 요소의 곱 |

**Examples**
```js
_([2, 2, 3]).product(); // 12
_(new Collection([2, 3, 4])).product(); // 24
```

# productBy
```js
_(this).productBy([by=(e => e)])
```
객체의 모든 요소의 곱을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| Collection` | 순회할 객체 |
| [by=(e => e)] | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value) |

**Returns**  
| type | description |
|------|-------------|
| `*` | 객체의 모든 요소의 곱 |

**Examples**
```js
_([{a: 2}, {a: 3}, {a: 4}]).productBy(v => v.a); // 24
```

# reduce
```js
_(this).sum()
```
객체의 모든 요소의 합을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| Collection` | 순회할 객체 |

**Returns**  
| type | description |
|------|-------------|
| `*` | 객체의 모든 요소의 합 |

**Examples**
```js
_([2, 3, 4]).sum(); // 9
_(new Collection([2, 3, 4])).product(); // 9
```

# sumBy
```js
_(this).sumBy([by=(e => e)])
```
객체의 모든 요소의 합을 반환합니다.

**Parameters**
| name | type | description |
|------|------|-------------|
| this | `Array \| Collection` | 순회할 객체 |
| [by=(e => e)] | `Function` | 요소마다 호출할 함수, 첫번째 인자는 요소(value) |

**Returns**  
| type | description |
|------|-------------|
| `*` | 객체의 모든 요소의 합 |

**Examples**
```js
_([{a: 1}, {a: 2}, {a: 4}]).sumBy(v => v.a); // 7
```