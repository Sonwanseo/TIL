# Chapter 3. 객체

## 3.1 구문

객체는 선언적(리터럴) 형식과 생성자 형식, 두 가지로 정의

선언적(리터럴) 형식

```javascript
var myObj = {
  key: value,
  // ...
};
```

생성자 형식

```javascript
var myObj = new Object();
myObj.key = value;
```

두 형식 모두 결과적으로 생성되는 객체는 같음  
유일한 차이점은 리터럴 형식은 한 번의 선언으로 다수의 키/값 쌍을 프로퍼티로 추가할 수 있지만, 생성자 형식은 한 번에 한 프로퍼티만 추가할 수 있음
**_'생성자 형식'으로 객체를 생성하는 일은 매우 드물다. 거의 리터럴 형식을 사용하며 대부분 내장 객체도 마찬가지다._**

## 3.2 타입

객체는 자바스크립트를 구성하는 평범한 레고 블록과 같음
자바스크립트 객체의 7개 주요 타입

- null
- undefined
- boolean
- number
- string
- object
- symbol(ES6에서 추가)

'단순 원시 타입(string, number, boolean, null, undefined)'은 객체 X
"자바스크립트는 모든 것이 객체다"라는 말은 잘못됨

반면 '복합 원시 타입'이라는 독특한 객체 하위 타입이 있음
function은 객체의 하위 타입
자바스크립트 수는 기본적으로 객체이므로 '일급'이며 여타의 일반 객체와 똑같이 취급된다.
**_자바스크립트 함수는 일급 객체. 즉, 다른 함수에 인자로 전달할 수 있고 다른 함수로부터 함수를 반환받을 수 있으며, 함수 자체를 변수에 할당하거나 자료 구조에 저장할 수도 있다._**

배열 역시 추가 기능이 구현된 객체의 일종
다른 일반 객체보다 좀 더 조직적으로 데이터가 구성됨

### 3.2.1 내장 객체

내장 객체라 부르는 객체 하위 타입도 존재

- String
- Number
- Boolean
- Object
- Function
- Array
- Data
- RegExp
- Error

내장 객체는 진짜 타입처럼 보이는 데다 자바의 String 클래스처럼 타 언어와 유사한 겉모습 때문에 클래스처럼 느껴짐
But, 이들은 단지 자바스크립트의 내장 함수일 뿐 각각 생성자로 사용되어 주어진 하위 타입의 새 객체를 생성

```javascript
var strPrimitive = "나는 문자열이야!";
typeof strPrimitive; // "string"
strPrimitive instanceof String; // false

var strObject = new Object("나는 문자열이야!");
typeof strObject; // "object"
strObject instanceof String; // true

// 객체 하위 타입을 확인한다.
Object.prototype.toString.call(strObject); // [object String]
```

"나는 문자열이야!"라는 원시 값은 객체가 아닌 원시 리터럴이며 불변값
문자 개수를 세는 등 문자별로 접근할 때엔 String 객체가 필요

자바스크립트 엔진은 상황에 맞게 문자열 원시 값을 String 객체로 자동 강제변환하므로 명시적으로 객체를 생성할 일은 적음
여러 자바스크립트 커뮤니티에서도 되도록 생성자 형식은 지양하고 리터럴 형식을 사용하라고 권장

```javascript
var strPrimitive = "나는 문자열이야!";
console.log(strPrimitive.length); // 13

console.log(strPrimitive.charAt(3)); // "m"
```

charAt 메서드는 자바스크립트 내장 객체인 String에 존재하는 메서드
자바스크립트 엔진이 자동으로 내장 객체로 강제 변환해주기 때문에 charAt 메서드가 사용 가능함
이 때, 내장 객체로 변환한 후 바로 삭제되는 객체를 **래퍼 객체**라 함
https://curryyou.tistory.com/184 자세한 내용 참고

객체 래퍼 형식이 없는 null과 undefined는 그 자체로 유일 값
반대로 Date 값은 리터럴 형식이 없어 반드시 생성자 형식으로 생성해야 함

Objects, Arrays, Functions, RegExps는 형식과 무관하게 모두 객체
추가 옵션이 필요한 경우에만 생성자 사용

Error 객체는 예외가 던져지면 알아서 생성되니 명시적으로 생성할 일은 드묾
생성자 형식 new Error()로 생성은 가능하나 거의 쓸 일이 없음

## 3.3 내용

객체는 특정한 위치에 저장된 모든 타입의 값, 즉 프로퍼티로 내용이 채워짐
객체 컨테이너에는 실제로 프로퍼티 값이 있는 곳을 가리키는 포인터 역할을 담당하는 프로퍼티명이 담겨 있음

```javascript
var myObject = {
  a: 2,
};
myObject.a; // 2
myObject["a"]; // 2
```

myObject 객체에서 a 위치의 값에 접근하려면 '.' 연산자 또는 '[]' 연산자 사용
일반적으로 .a 구문을 '프로퍼티 접근', ["a"] 구문을 '키 접근'이라 함

. 연산자 뒤에 식별자 호환 프로퍼티명이 와야 하지만 [""] 구문은 UTF-8/유니코드 호환 문자열이라면 모두 프로퍼티명으로 쓸 수 있다는 점에서 차이가 있음
ex) 자바스크립트 식별자로는 \_와 $를 제외한 특수문자와 공백을 사용할 수 없으므로 "Super-Fun!"라는 이름의 프로퍼티가 있다면 ["Super-Fun!"]으로 접근해야 함

객체 프로퍼티명은 언제나 문자열
문자열 이외의 다른 원시 값을 쓰면 우선 문자열로 변환됨
배열 인덱스로 사용하는 숫자도 마찬가지이므로 객체와 배열 사이에 숫자를 써서 헷갈리는 코드를 만들지 않도록 주의

### 3.3.1 계산된 프로퍼티명

myObject[]같은 프로퍼티 접근 구문은 myObject[prefix + name] 형태의 계산식 값으로 키 이름을 나타낼 때만 유용

ES6부터는 계산된 프로퍼티명이라는 기능이 추가됨
객체 리터럴 선언 구문의 키 이름 부분에 해당 표현식을 넣고 []로 감싸면 됨

```javascript
var prefix = "foo";
var myObject = {
  [prefix + "bar"]: "hello",
  [prefix + "baz"]: "world",
};

myObject["foobar"]; // hello
myObject["foobaz"]; // world
```

심볼에서 계산된 프로퍼티명이 많이 사용됨

```javascript
var myObject = {
  [Symbol.Something]: "hello wrold",
};
```

### 3.3.2 프로퍼티 vs 메서드

엄밀히 말해 함수는 결코 객체에 속하는 것이 아니며, 객체 레퍼런스로 접근한 함수를 그냥 메서드라 칭하는 건 그 의미를 지나치게 확대해 해석한 것임

```javascript
function foo() {
  console.log("foo");
}
var someFoo = foo; // "foo"에 대한 변수 레퍼런스
var myObject = {
  someFoo: foo,
};
foo; // function foo() { ... }
someFoo; // function foo() { ... }
myObject.someFoo; // function foo() { ... }
```

someFoo나 myObject.someFoo 모두 같은 함수를 가리키는 개별 레퍼런스일 뿐, 뭔가 특별한 다른 객체가 '소유한' 함수라는 의미가 아님
foo() 안에 this 레퍼런스가 정의되어 있다면 myObject.someFoo에서 발생할 암시적 바인딩이 두 레퍼런스의 유일한 차이점

함수 표현식을 객체 리터럴의 한 부분으로 선언해도 이 함수가 저절로 객체에 달라붙는 건 아니며 해당 함수 객체를 참조하는 레퍼런스가 하나 더 생기는 것뿐임

```javascript
var myObject = {
  foo: function () {
    consooel.log("foo");
  },
};
var someFoo = myObject.foo;
someFoo; // function foo() { ... }
myObject.foo; // function foo() { ... }
```

### 3.3.3 배열

배열도 []로 접근하는 형태이지만 값을 저장하는 방법과 장소가 더 체계적임
배열은 숫자 인덱싱, 즉 인덱스라는 양수로 표기된 위치에 값을 저장

인덱스는 양수지만 배열 자체느는 객체여서 배열에 프로퍼티를 추가하는 것도 가능
.이나 [] 구문에 상관없이 이름 붙은 프로퍼티를 추가해도 배열 길이에는 변함이 없다.

```javascript
var myArray = ["foo", 42, "bar"];
myArray.baz = "baz";
myArray.length; // 3
myArray.baz; // "baz"
```

배열에 프로퍼티를 추가할 때 프로퍼티명이 숫자와 유사하면 숫자 인덱스로 잘못 해석하여 배열 내용이 달라질 수 있음

```javascript
var myArray = ["foo", 42, "bar"];
myArray["3"] = "baz";
myArray.length; // 4
myArray[3]; // "baz"
```

### 3.3.4 객체 복사


자바스크립트를 처음 시작하는 개발자가 가장 흔히 고민하는 문제 중 하나