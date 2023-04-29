
# at
```js
_(this).at(index)
```
`at`은 배열의 특정 인덱스에 있는 요소를 반환합니다. 음수 인덱스는 배열의 끝에서부터 요소를 반환합니다.

**Aliases**
- `nth`

**Parameters**
- `this: Array | String`  
  순회할 객체
- `index: Number`  
  요소의 인덱스, 음수일 경우 배열의 끝에서부터 셈합니다.

**Returns**
- `returns: *`  
  `array`의 `index`번째 요소

**Examples**
```js
_([1, 2, 3]).at(1); // 2
_([1, 2, 3]).at(-1); // 3
_([1, 2, 3]).at(3); // undefined
_('abc').at(1); // 'b'
```

# endsWith
```js
_(this).endsWith(item)
```
객체의 마지막 요소와 인자로 받은 `item`이 같은지 비교합니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `item: *`  
  비교할 요소

**Returns**
- `returns: Boolean`  
  마지막 요소와 인자로 받은 `item`이 같으면 true, 아니면 false

**Examples**
```js
_([1, 2, 3]).endsWith(3); // true
_('abc').endsWith('c'); // true
```

# find
```js
_(this).find(value)
```
객체에서 `value`와 일치하는 첫번째 요소의 인덱스를 반환합니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `value: *`  
  찾을 값

**Returns**
- `returns: Number`  
  `value`의 인덱스, 없으면 `null`

**Examples**
```js
_([1, 2, 3]).find(2); // 1
_([1, 2, 3]).find(4); // null
_('abc').find('b'); // 1
```

# head
```js
_(this).head()
```
배열의 첫번째 요소를 반환한다.

**Aliases**
- `first`
- `front`

**Parameters**
- `this: Array | String`  
  순회할 객체

**Returns**
- `returns: *`  
  배열의 첫번째 요소

**Examples**
```js
_([1, 2, 3]).head(); // 1
_('abc').head(); // 'a'
_([]).head(); // undefined
```

# pad
```js
_(this).pad(length, [pad=')
```
객체를 `length`만큼 양쪽으로 패딩합니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `length: Number`  
  패딩할 길이
- `[pad=': *`  
  ', 0] 패딩할 값, 객체가 문자열이면 공백, 배열이면 0이 기본값입니다.

**Returns**
- `returns: Array | String`  
  객체를 `length`만큼 `pad`로 채운 값

**Examples**
```js
_([1, 2, 3]).pad(5); // [0, 1, 2, 3, 0]
_('abc').pad(5); // ' abc '
_([1, 2, 3]).pad(5, 1); // [1, 1, 2, 3, 1]
_('abc').pad(5, '1'); // '1abc1'
```

# padEnd
```js
_(this).padEnd(length, [pad=')
```
객체를 `length`만큼 오른쪽으로 패딩합니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `length: Number`  
  패딩할 길이
- `[pad=': *`  
  ', 0] 패딩할 값, 객체가 문자열이면 공백, 배열이면 0이 기본값입니다.

**Returns**
- `returns: Array | String`  
  객체를 `length`만큼 `pad`로 채운 값

**Examples**
```js
_([1, 2, 3]).padEnd(5); // [1, 2, 3, 0, 0]
_('abc').padEnd(5); // 'abc  '
_([1, 2, 3]).padEnd(5, 1); // [1, 2, 3, 1, 1]
_('abc').padEnd(5, '1'); // 'abc11'
```

# padStart
```js
_(this).padStart(length, [pad=')
```
객체를 `length`만큼 왼쪽으로 패딩합니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `length: Number`  
  패딩할 길이
- `[pad=': *`  
  ', 0] 패딩할 값, 객체가 문자열이면 공백, 배열이면 0이 기본값입니다.

**Returns**
- `returns: Array | String`  
  객체를 `length`만큼 `pad`로 채운 값

**Examples**
```js
_([1, 2, 3]).padStart(5); // [0, 0, 1, 2, 3]
_('abc').padStart(5); // '  abc'
_([1, 2, 3]).padStart(5, 1); // [1, 1, 1, 2, 3]
_('abc').padStart(5, '1'); // '11abc'
```

# pop
```js
_(this).pop(idx)
```
배열의 `idx`번째 요소를 제거한 배열을 반환합니다.

**Aliases**
- `drop`

**Parameters**
- `this: Array | String`  
  순회할 객체
- `idx: Number`  
  제거할 요소의 인덱스, 음수일 경우 배열의 끝에서부터의 거리로 계산됩니다.

**Returns**
- `returns: Array | String`  
  `idx`번째 요소를 제거한 배열

**Examples**
```js
_([1, 2, 3]).pop(1); // [1, 3]
_('abc').pop(1); // 'ac'
_([1, 2, 3]).pop(-1); // [1, 2]
_('abc').pop(-1); // 'ab'
```

# repeat
```js
_(this).repeat(n, [fix=false])
```
객체을 반복해서 연장합니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `n: Number`  
  반복 횟수, `fix`가 `true`이면 최종 객체의 길이를 의미합니다. 실수가 허용됩니다.
- `[fix=false]: Boolean`  
  객체의 길이를 고정할지 여부, 기본값은 `false`입니다.

**Returns**
- `returns: Array | String`  
  반복된 객체

**Examples**
```js
_([1, 2, 3]).repeat(2); // [1, 2, 3, 1, 2, 3]
_('abc').repeat(2); // 'abcabc'
_([1, 2, 3, 4]).repeat(2.5); // [1, 2, 3, 4, 1, 2, 3, 4, 1, 2]

_([1, 2, 3]).repeat(2.3333...); // 의도는 [1, 2, 3, 1, 2, 3, 1] 이지만 `n`에 정확한 7/3 값을 입력할 수 없음
_([1, 2, 3]).repeat(7, true) // 이 때 `fix`를 true로 고정해 [1, 2, 3, 1, 2, 3, 1]를 얻을 수 있음
```

# replace
```js
_(this).replace(from, to)
```
객체의 값 중 `from`을 전부 `to`로 바꿉니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `from: Any`  
  바꿀 값
- `to: Any`  
  바뀔 값

**Returns**
- `returns: Any`  
  모든 `from`을 `to`로 바꾼 객체

**Examples**
```js
_("aabbcc").replace("a", "b"); // 'bbbbcc'
_([1, 2, 1, 2, 2, 3]).replace(2, 3); // [1, 3, 1, 3, 3, 3]
```

# rfind
```js
_(this).rfind(value)
```
객체에서 `value`와 일치하는 마지막 요소의 인덱스를 반환합니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `value: *`  
  찾을 값

**Returns**
- `returns: Number`  
  `value`의 인덱스, 없으면 `null`

**Examples**
```js
_([1, 2, 1, 2, 3]).rfind(2); // 3
_([1, 2, 3]).rfind(4); // null
```

# slice
```js
slice([start=0], [end=length], [step=1])
```
배열의 [start, end) 구간에서 step만큼 건너뛴 배열을 반환합니다. Python의 slice 문법과 일치합니다.

**Parameters**
- `[start=0]: Number`  
  시작 인덱스, 음수일 경우 배열의 끝에서부터 센 인덱스
- `[end=length]: Number`  
  끝 인덱스, 음수일 경우 배열의 끝에서부터 센 인덱스
- `[step=1]: Number`  
  건너뛸 간격

**Returns**
- `returns: Array`  
  배열의 [start, end) 구간에서 step만큼 건너뛴 배열

**Examples**
```js

```

# startsWith
```js
_(this).startsWith(item)
```
객체의 첫번째 요소와 인자로 받은 `item`이 같은지 비교합니다.

**Parameters**
- `this: Array | String`  
  순회할 객체
- `item: *`  
  비교할 요소

**Returns**
- `returns: Boolean`  
  첫번째 요소와 인자로 받은 `item`이 같으면 true, 아니면 false

**Examples**
```js
_([1, 2, 3]).startsWith(1); // true
_('abc').startsWith('a'); // true
```

# tail
```js
_(this).tail()
```
배열의 마지막 원소를 반환합니다.

**Aliases**
- `last`
- `back`

**Parameters**
- `this: Array | String`  
  순회할 객체

**Returns**
- `returns: *`  
  배열의 마지막 원소

**Examples**
```js
_([1, 2, 3]).tail(); // 3
_('abc').tail(); // 'c'
_([]).tail(); // undefined
```
