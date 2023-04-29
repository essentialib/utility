
# format
```js
_(this).format(options)
```
문자열을 포매팅합니다.

**Aliases**
- `f`

**Parameters**
- `this: String`  
  포맷 문자열
- `options: ...* | Object`  
  포맷 문자열에 대입할 값입니다.

**Returns**
- `returns: String`  
  포맷된 문자열을 반환합니다.

**Examples**
```js
_('Hello, {name}!').format({ name: 'world' }); // 'Hello, world!'
_('Hello, {0}!').format('world'); // 'Hello, world!'
_('{} {} {}').format('a', 'b', 'c'); // 'a b c', 인덱스는 자동으로 지정되며 1씩 증가합니다.
_('{} {} {}').format('a', 'b'); // 'a b {}', 인덱스가 부족하면 그대로 출력됩니다.
_('{} {} {}').format('a', 'b', 'c', 'd'); // 'a b c', 인덱스가 초과하면 무시됩니다.
_('{} {1} {}').format('a', 'b', 'c'); // 'a b b', 직접 인덱스를 지정하면 자동으로 증가하지 않고 한 차례 밀립니다.
_('hello {}, {{}}').format('world', 'wide'); // 'hello world, {}', 중괄호를 출력하려면 두 개를 연속으로 써야 합니다.
```

# toCaseFormat
```js
_(this).toCaseFormat(format)
```
문자열을 대소문자 변환하여 반환합니다.

**Parameters**
- `this: String`  
  변환할 문자열
- `format: String`  
  'u' or 'U'는 대문자, 'd' or 'D'는 소문자, 그 외는 변환하지 않습니다.

**Returns**
- `returns: String`  
  대소문자 변환된 문자열

**Examples**
```js
_('abc').toCaseFormat('u'); // 'Abc'
_('abc').toCaseFormat('UUU'); // 'ABC'
_('ABC').toCaseFormat('d d'); // 'aBc'
_('ABC').toCaseFormat('DUU'); // 'aBC'
```

# toLower
```js
_(this).toLower()
```
소문자로 변환

**Parameters**
- `this: String`  
  소문자로 변환할 문자열

**Returns**
- `returns: String`  
  소문자로 변환된 문자열

**Examples**
```js
_('ABC').toLower(); // 'abc'
```

# toUpper
```js
_(this).toUpper()
```
대문자로 변환

**Parameters**
- `this: String`  
  대문자로 변환할 문자열

**Returns**
- `returns: String`  
  대문자로 변환된 문자열

**Examples**
```js
_('abc').toUpper(); // 'ABC'
```

# trim
```js
_(this).trim([chars=')
```
문자열의 앞뒤에 지정된 문자들을 제거합니다.

**Parameters**
- `this: String`  
  변형할 문자열
- `[chars=': String`  
  \t\r\n\v\f'] 제거할 문자들, 기본값은 공백 문자

**Returns**
- `returns: String`  
  문자열 앞뒤로 `chars`로 지정된 문자들을 제거한 문자열을 반환합니다.

**Examples**
```js
_('  abc  ').trim(); // 'abc'
_('_-abc_-').trim('_-'); // 'abc'
```

# trimLeft
```js
_(this).trimLeft([chars=')
```
문자열의 앞에 지정된 문자들을 제거합니다.

**Parameters**
- `this: String`  
  변형할 문자열
- `[chars=': String`  
  \t\r\n\v\f'] 제거할 문자들, 기본값은 공백 문자

**Returns**
- `returns: String`  
  문자열 앞에 `chars`로 지정된 문자들을 제거한 문자열을 반환합니다.

**Examples**
```js
_('  abc  ').trimLeft(); // 'abc  '
_('_-abc_-').trimLeft('_-'); // 'abc_-'
```

# trimRight
```js
_(this).trimRight([chars=')
```
문자열의 뒤에 지정된 문자들을 제거합니다.

**Parameters**
- `this: String`  
  변형할 문자열
- `[chars=': String`  
  \t\r\n\v\f'] 제거할 문자들, 기본값은 공백 문자

**Returns**
- `returns: String`  
  문자열 뒤에 `chars`로 지정된 문자들을 제거한 문자열을 반환합니다.

**Examples**
```js
_('  abc  ').trimRight(); // '  abc'
_('_-abc_-').trimRight('_-'); // '_-abc'
```
