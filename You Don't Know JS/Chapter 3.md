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

```javascript
function anotherFunction() {
	...
}
var anotherObject = {
	c: true
}
var anotherArray = [];
var myObject = {
	a: 2,
	b: anotherObject, // 사본이 아닌 레퍼런스
	c: anotherArray, // 레퍼런스
	d: anotherFunction
};
anotherArray.push(anotherObject, myObject);
```

객체를 복사하려면 얕은 복사와 깊은 복사 중 한 가지의 방법을 정해야 함
깊은 복사를 하면 환형 참조 형태가 되어 무한 복사가 발생한다.

한편, 얕은 복사는 이해하기 쉽고 별다른 이슈가 없기에 ES6부터는 Object.assign() 메서드를 제공
이 메서드의 첫째 인자는 타깃 객체고 둘째 인자 이후는 하나 또는 둘 이상의 소스 객체로, 소스 객체의 모든 열거 가능한 것과 보유 키를 순회하면서 타깃 객체로 복사

```javascript
var newObj = Object.assign({}, myObject);
newObj.a; // 2
newObj.b === anotherObject; // true
newObj.c === anotherArray; // true
newObj.d === anotherFunction; // true
```

### 3.3.5 프로퍼티 서술자

ES5 이전에는 읽기 전용과 같은 프로퍼티의 특성을 자바스크립트 코드로 직접 구별하거나 확인할 방법이 없었음
하지만 ES5부터 모든 프로퍼티는 프로퍼티 서술자로 표현됨

```javascript
var myObject = {
	a: 2
};
Object.getOwnPropertyDescriptor(myObject, "a");
// {
// value: 2,
// writable: true,
// enumerable: true,
// configurable: true
// }
```

평범한 객체 프로퍼티 a의 프로퍼티 서술자를 조회해보니 writable, enumerable, configurable의 세 가지 특성이 존재

이렇게 프로퍼티 생성 시 프로퍼티 서술자에 담긴 기본 특성값을 확인할 수 있는데, Object.defineProperty()로 새로운 프로퍼티를 추가하거나 기존 프로퍼티의 특성을 원하는 대로 수정할 수 있음

##### 쓰기 기능

프로퍼티 값의 쓰기 가능 여부는 writable로 조정

쓰기 금지된 값을 수정하려고 하면 조용히 실패하며 엄격 모드에선 에러가 남

##### 설정 가능

프로퍼티가 설정 가능하면 defineProperty()로 프로퍼티 서술자 변경 가능

***미묘한 예외 상황도 존재. 이미  configurable: false인 프로퍼티라도 writable은 true에서 false로 에러 없이 변경이 가능함. But, 이 또한 한번 false가 되면 다시는 true로 되돌릴 수 없음***

configurable: false로 설정하면 이미 delete 연산자로 존재하는 프로퍼티 삭제도 금지됨

delete는 객체에서 프로퍼티를 곧바로 삭제하는 용도로만 사용됨
그런데 이 프로퍼티가 어떤 객체/함수를 가리키는 마지막 레퍼런스면 레퍼런스가 삭제되면서 결국 이 객체/함수는 아무것도 참조하지 않게 되어 가비지 컬렉션의 대상이 됨

##### 열거 가능성

enumerable은 for...in 루프처럼 객체 프로퍼티를 열거하는 구문에서 해당 프로퍼티의 표출 여부를 나타냄
enumerable:l false로 지정된 프로퍼티는 접근할 수는 있지만 루프 구문에서 감춰짐
물론 true로 바꾸면 다시 모습을 드러냄

보통 사용자 정의 프로퍼티는 enumerable: true가 기본값이어서 열거가 가능
감추고 싶은 특별한 프로퍼티에 한하여 enumberable: false 설정

### 3.3.6 불변성

프로퍼티/객체가 변경되지 않게 해야 할 경우가 있음
ES5부터는 이런 처리를 할 수 있는 다양한 방법 제공
But, 이러한 방법은 얕은 불변성만 지원
즉, 객체 자신과 직속 프로퍼티 특성만 불변으로 만들 뿐 다른 객체를 가리키는 레퍼런스가 있을 때 해당 객체의 내용까지 불변으로 만들지는 못함

***자바스크립트에서 뼛속까지 고정된 불변 객체를 쓸 일은 거의 없음. 필요한 경우도 있겠지만 객체를 봉인 또는 동결해야 하는 상황이라면 객체 값이 변경되어도 문제가 없는 견고한 프로그램을 설계한 다른 방법은 없는지 일반적인 디자인 패턴 관점에서 재고해야 함***

##### 객체 상수

writable: false와 configurable: false를 같이 쓰면 객체 프로퍼티를 상수처럼 쓸 수 있음

##### 확장 금지

객체에 더는 프로퍼티를 추가할 수 없게 차단하고 현재 프로퍼티는 있는 그대로 놔두고 싶을 때 Object.perventExtensions()를 호출

##### 봉인

Object.seal()는 봉인된 객체 생성
즉, 어떤 객체에 대해 Object.preventExtensions()를 실행하고 프로퍼티를 전부 configurable: false 처리
결과적으로는 더는 프로퍼티를 추가할 수 없을 뿐더러 기존 프로퍼티를 재설정하거나 삭제할 수 없다
값은 변경 가능

##### 동결

Object.freeze()는 객체를 동결시킴
Object.seal()을 적용하고 '데이터 접근자' 프로퍼티를 모두 writable: false 처리해서 값도 변경 불가

동결은 가장 높은 단계의 불변성을 적용한 것으로 객체와 직속 프로퍼티에 어떤 변경도 원천 봉쇄함

Object.freeze()를 적용하면 지금까지는 전혀 영향을 받지 않았던 해당 객체가 참조하는 모든 객체를 재귀 순회하며 Object.freeze()를 적용하여 깊숙이 동결함

### 3.3.7 [[Get]]

```javascript
var myObject = {
	a: 2
};
myObject.a; // 2
```

myObject.a는 누가 봐도 프로퍼티 접근이지만  a란 이름의 프로퍼티를 myObject에서 찾지 않음
명세에 따르면 실제로 이 코드는 myObject에 대해 [[Get]] 연산을 함

기본적으로 [[Get]] 연산은 주어진 이름의 프로퍼티를 먼저 찾아보고 있으면 그 값을 반환

주어진 프로퍼티 값을 어떻게 해도 찾을 수 없으면 [[Get]] 연산은 undefined를 반환

식별자명으로 변수를 참조할 때는 작동 방식이 다름
해당하는 렉시컬 스코프 내에 없는 변수를 참조하면 객체 프로퍼티처럼 undefined가 반환되지 않고 ReferenceError가 발생

### 3.3.8 [[Put]]

[[Put]]을 실행하면 주어진 객체에 프로퍼티가 존재하는지 등 여러 가지 요소에 따라 이후 작동 방식이 달라짐
[[Put]] 알고리즘은 이미 존재하는 프로퍼티에 대해 대략 다음의 확인 절차를 밟음

1. 프로퍼티가 접근 서술자인가? 맞으면 세터를 호출
2. 프로퍼티가 writable: false인 데이터 서술자인가? 맞으면 비엄격 모드에서 조용히 실패하고 엄격 모드는 TypeError가 발생
3. 이외에는 프로퍼티에 해당 값을 세팅

객체에 존재하지 않는 프로퍼티라면 [[Put]] 알고리즘은 훨씬 더 미묘하고 복잡해짐

### 3.3.9 게터와 세터

[[Put]]과 [[Get]] 기본 연산은 이미 존재하거나 전혀 새로운 프로퍼티에 값을 세팅하거나 기존 프로퍼티로부터 값을 조회하는 역할을 각각 담당함

***차후에 자바스크립터 언어가 아주 고도화되면 프로퍼티는 물론이고 모든 객체의 기본 [[Get]]/[[Put]] 연산을 오버라이드하는 것도 가능할 것이다.***

ES5부터는 게터/세터를 통해 프로퍼티 수준에서 이러한 기본 로직을 오버라이드할 수 잇음
게터/세터는 각각 실제로 값을 가져오는/세팅하는 감춰진 함수를 호출하는 프로퍼티임

프로펕피가 게터 또는 세터 어느 한쪽이거나 동시에 게터/세터가 될 수 있게 정의한 것을 '접근 서술자'라고 함
접근 서술자에서는 프로퍼티의 값과 writable 속성은 무시되며 대신 프로퍼티의 겟/셋 속성이 중요함

```javascript
var myObject = {
	// 'a'의 게터를 정의한다.
	get a() {
		return 2;
	}
};
Object.defineProperty(
	myObject, // 타깃
	"b", // 프로퍼티명
	{ // 서술자
		// 'b'의 게터를 정의한다.
		get: function() { return this.a * 2 },
		
		// 'b'가 객체 프로퍼티로 확실히 표시되게 한다.
		enumerable: true
	}
);
myObject.a; // 2
myObject.b; // 4
```

get a() { } 처럼 리터럴 구문으로 기술하든, defineProperty()로 명시적 정의를 내리든 실제로 값을 가지고 있지 않은 객체에 프로퍼티를 생성하는 건 같지만 프로퍼티에 접근하면 자동으로 게터 함수를 은밀하게 호출하여 어떤 값이라도 게터 함수가 반환한 값이 결괏값이 된다.

```javascript
var myObject = {
	// 'a'의 게터를 정의한다.
	get a() {
		return 2;
	}
};
myObject.a = 3;
myObject.a; // 2
```

a의 게터가 정의되어 있으므로 할당문으로 값을 세팅하려고 하면 에러 없이 조용히 무시됨
세터가 있어도 커스텀 게터가 2만 반환하게 하드 코딩되어 있어서 세팅은 무의미

프로퍼티 단위로 기본 [[Put]] 연산을 오버라이드하는 세터가 정의되어야 함
게터와 세터는 항상 둘 다 선언하는 것이 좋음

### 3.3.10 존재 확인

객체에 어떤 프로퍼티가 존재하는지는 굳이 프로퍼티 값을 얻지 않고도 확인 가능

```javascript
var myObject = {
	a: 2
};

("a" in myObject); // true
("b" in myObject); // false

myObject.hasOwnProperty("a"); // true
myObject.hasOwnProperty("b"); // false
```

in 연산자는 어떤 프로퍼티가 해당 객체에 존재하는지 아니면 이 객체의 [[Prototype]] 연쇄를 따라갔을 때 상위 단계에 존재하는지 확인함
이와 달리 hasOwnProperty()는 단지 프로퍼티가 객체에 있는지만 확인하고 [[Prototype]] 연쇄는 찾지 않음

거의 모든 일반 객체는 Object.prototype 위임을 통해 hasOwnProperty()에 접근이 가능하지만 간혹 Object.prototype과 연결되지 않은 객체는 myObject.hasOwnProperty() 처럼 사용할 수 없음

이럴 경우엔 Object.prototype.hasOwnProperty.call(myObject, "a")처럼 기본 hasOwnProperty() 메서드를 빌려와 myObject에 대해 명시적으로 바인딩하면 좀 더 확실하게 확인 가능

***언뜻 in 연산자가 내부 값이 존재하는지까지 확인하는 것처럼 보이지만 실은 프로퍼티명이 있는지만 본다. 그러므로 배열에서 4 in [2,4, 6]처럼 써도 예상대로 실행되지 않는데, 이러한 차이점을 숙지하고 있어야 실수하지 않는다.***

##### 열거

```javascript
var myObject = { };
Object.defineProperty(
	myObject,
    "a",
    // 'a'를 열거가 가능하게 세팅한다(기본값이다).
    { enumerable: true, value: 2 }
);
Object.defineProperty(
	myObject,
	"b",
	// 'b'를 열거가 불가능하게 세팅한다.
	{ enumerable: false, value: 3 }
);
myObject.b; // 3
("b" in myObject); // true
myObject.hasOwnProperty("b"); // true

for(var k in myObject) {
	console.log(k, myObject[k]);
}
// "a" 2
```

myObject.b는 실제 존재하는 프로퍼티로 그 값에도 접근할 수 있지만, for...in 루프에서는 접근 불가
이처럼 '열거 가능'하다는 건 기본적으로 '객체 프로퍼티 순회 리스트에 포함'된다는 뜻

***for...in 루프를 배열에 사용하면 배열 인덱스뿐만 아니라 다른 열거 가능한 프로퍼티까지 순회 리스트에 포함되는 원치 않은 결과가 발생할 수 있다. for...in는 객체에만 쓰고 배열은 과거처럼 숫자 인덱스로 순회하는 편이 바람직하다.***

```javascript
var myObject = { };
Object.defineProperty(
	myObject,
	"a",
	// 'a'를 열거가 가능하게 세팅한다(기본값이다).
	{ enumerable: true, value: 2 }
);
Object.defineProperty(
	myObject,
	"b",
	// 'b'를 열거가 불가능하게 세팅한다.
	{ enumerable: false, value: 3 }
);

myObject.propertyIsEnumerable("a"); // true
myObject.propertyIsEnumerable("b"); // false

Object.keys(myObject); // ["a"]
Object.getOwnPropertyNames(myObject); // ["a", ["b"]
```

propertyIsEnumerable()은 어떤 프로퍼티가 해당 객체의 직속 프로퍼티인 동시에 enumerable: true인지 검사
Object.keys()는 Object.getOwnPropertyNames()의 열거 가능 여부와 상관없이 객체에 있는 모든 열거 가능한 프로퍼티를 배열 형태로 반환함

in과 hasOwnProperty()가 [[Prototype]] 연쇄의 확인에 따라 차이가 있는 반면, Object.keys()와 Object.getOwnPropertyNames()는 모두 주어진 객체만 확인함

in 연산자와 결과가 동등한 프로퍼티 전체 리스트를 조회하는 기능은 없음
단계마다 Object.keys()에서 열거 가능한 프로퍼티 리스트를 포착하여 재귀적으로 주어진 객체의 [[Prototype]] 연쇄를 순회하는 식의 로직을 구현하여 대략 비슷한 유틸리티를 만들어 쓰면 됨

## 3.4 순회

for...in 루프는 열거 가능한 객체 프로퍼티를 차례로 순회

```javascript
var myArray = [1, 2, 3];
for(var i = 0; i < myArray.length; i++) {
	console.log(myArray[i]);
}
// 1 2 3
```

위 코드는 인덱스를 순회하면서 해당 값을 사용할 뿐 값 자체를 순회하는 것은 아님

ES5부터는 forEach(), every(), some() 등의 배열 관련 순회 헬퍼가 도입됨
이 함수들은 배열의 각 원소에 적용할 콜백 함수를 인자로 받으며, 원소별로 반환 값을 처리하는 로직만 다름

forEach()는 배열 전체 값을 순회하지만 콜백 함수의 반환 값은 무시
every()는 배열 끝까지 또는 콜백 함수가 false를 반환할 때까지 순회하며 some()은 이와 정반대로 배열 끝까지 또는 콜백 함수가 true를 반환할때까지 순회함
every()와 some()의 이러한 특별한 반환 값은 일반적인 for 루프의 break 문처럼 끝까지 순회하기 전에 일찌감치 순회를 끝내는 게 쓰임

for...in 루프를 이용한 객체 순회는 실제로 열거 가능한 프로퍼티만 순회하고 그 값을 얻으려면 일일이 프로퍼티에 접근해야 하므로 간접적인 값 추출임

ES6부터 배열 순회용 for...of 구문을 제공함

```javascript
var myArray = [1, 2, 3];
for(var v of myArray) {
	console.log(v);
}
// 1
// 2
// 3
```

for...of 루프는 순회할 원소의 순회자 객체가 있어야 함
순회당 한 번씩 이 순회자 객체의 next() 메서드를 호출하여 연속적으로 반환 값을 순회함

배열은 @@iterator가 내장된덕분에 손쉽게 for...of 루르 사용 가능

```javascript
var myArray = [1, 2, 3];
var it = myArray[Symbol.iterator]();

it.next(); // { value: 1, done: false }
it.next(); // { value: 2, done: false }
it.next(); // { value: 3, done: false }
it.next(); // { done: true }
```

***ES6부터는 Symbol.iterator 심볼로 객체 내부 프로퍼티인 @@iterator에 접근할 수 있다. 이런 특수 프로퍼티는 심볼에 포함될지 모를 특수값보다는 심볼명으로 참조하는 것이 좋다. @@iterator라는 명칭 때문에 순회자 객체란 느낌이 강한데 실은 순회자 객체를 반환하는 함수이다.***

for...of 루프에서 매번 myObject의 순회자 객체에 next()를 호출하면 내부 포인터는 하나씩 증가하면서 객체 프로퍼티 목록의 다음 값을 반환

순회가 절대로 끝나지 않고 항상 새로운 값을 반환하는 무한 순회자도 가능
하지만 이렇게 순회자로 for...of 루프의 경계를 무너뜨리면 결국 실행이 멈추지 않아 프로그램이 멎을 수 있으니 별로 사용할 일은 없음

```javascript
var randoms = {
	[Symbol.iterator]: function() {
		return {
			next: function() {
				return { value: Math.random() };
			}
		}
	}
};

var randoms_pool = [];
for(var n of randoms) {
	randoms_pool.push(n);
	
	// 제한 없이 사용한다.
	if (randoms_pool.length === 100) break;
}
```

## 3.5 정리하기

자바스크립트 객체는 리터럴 형식과 생성자 형식 두 가지 형태를 가짐
대부분 리터럴 형식을 쓰는 편이 좋지만 생성 시 옵션을 더 주기 위해 생성자 형식을 쓰는 경우도 존재

많은 사람이 "자바스크립트는 모든 것이 다 객체다"라고 말하지만 사실과 다름
객체는 6개의 원시 타입 중 하나고 함수를 비롯한 하위 타입이 존재
이를테면 내부적으로 [object Array]라는 레이블로 표시되는 배열 객체라는 독특한 하위 타입도 가능

객체는 키/값의 쌍을 모아 놓은 저장소고 값은 프로퍼티를 통해 접근 가능
프로퍼티에 접근하면 엔진 내부에서는 실제로 기본 [[Get]] 연산을 호출하는데, 객체 자체에 포함된 프로퍼티뿐만 아니라 필요하면 [[Prototype]] 연쇄를 순회하며 찾아봄

프로퍼티는 프로퍼티 서술자를 통해 제어 가능한 wrirable, configurable 등의 특정한 속성을 지님
그리고 객체는 Object.preventExtensions(), Object.seal(), Object.freeze() 등을 이용하여 자신에게 여러 단계의 불변성 적용 가능

프로퍼티가 반드시 값을 가져야 하는 것은 아니며 게터/세터로 '접근자 프로퍼티' 형태를 취할 수도 있음

ES6부터는 for...of 구문에서 한 번에 하나씩 다음 데이터 값으로 이동하는 next() 메서드를 가진 내장/커스텀 @@iterator 객체를 통해 자료 구조에서 여러 값을 순회할 수 있음