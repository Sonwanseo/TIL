# Chapter 5. 프로토타입

## 5.1 [[Prototype]]

명세에 따르면 자바스크립트 객체는 [[Prototype]]이라는 내부 프로퍼티가 있고 다른 객체를 참조하는 단순 레퍼런스로 사용  
거의 모든 객체가 이 프로퍼티에 null이 아닌 값이 생성 시점에 할당됨  
드물긴 하지만 [[Prototype]] 링크가 텅 빈 객체도 가능

```javascript
var myObject = {
  a: 2,
};
myObject.a; // 2
```

객체 프로퍼티 참조 시 [[Get]]이 호출됨  
[[Get]]은 기본적으로 객체 자체에 해당 프로퍼티가 존재하는지 찾아보고 존재하면 그 프로퍼티를 사용

[[Get]]은 주어진 프로퍼티를 객체에서 찾지 못하면 곧바로 [[Prototype]] 링크를 따라가면서 프로퍼티를 찾음

```javascript
var anotherObject = {
  a: 2,
};

// 'anotherObject'에 연결된 객체를 생성한다.
var myObject = Object.create(anotherObject);

myObject.a; // 2
```

myObject.a란 프로퍼티는 없지만 anotherObject에서 2라는 값을 대신 찾아 프로퍼티 접근의 결괏값으로 반환  
만약 anotherObject에서도 못 찾으면 [[Prototype]] 연쇄를 따라 올라감

일치하는 프로퍼티명이 나올 때까지 아니면 [[Prototype]] 연쇄가 끝날 때까지 같은 과정이 계속됨  
연쇄 끝에 이르러서도 프로퍼티가 발견되지 않으면 [[Get]]은 결과값으로 undefined를 반환

for...in 루프에서 객체를 순회할 때도 [[Prototype]] 연쇄의 검색 과정과 비슷한 방식으로 연쇄를 통해 접근 가능한 프로퍼티라면 모두 열거함
in 연산자로 객체에 프로퍼티 유무를 확인할 때에는 객체의 연쇄를 전부 샅샅이 뒤짐

```javascript
var anotherObject = {
  a: 2,
};

// 'anotherObject'에 연결된 객체를 생성한다.
var myObject = Object.create(anotherObject);

for (var k in myObject) {
  console.log(k + "를 발견!");
}
// a를 발견!

"a" in myObject; // true
```

어떤 방식이든 객체에서 프로퍼티를 검색할 때 [[Prototype]] 연쇄를 한 번에 한 링크씩 계속 뒤짐

### 5.1.1 Object.prototype

일반 [[Prototype]] 연쇄는 결국 내장 프로토타입 Object.prototype에서 끝남  
모든 자바스크립트 객체는 Object.prototype 객체의 '자손'이므로 Object.prototype에는 자바스크립트에서 두루 쓰이는 다수의 공용 유틸리티가 포함되어 있음

### 5.1.2 프로퍼티 세팅과 가려짐

`myObject.foo = "bar";`

foo라는 이름의 평범한 데이터 접근 프로퍼티가 myObject 객체에 직속된 경우 이 할당문은 기존 프로퍼티 값을 고치는 단순한 기능을 할 뿐임  
foo가 myObject에 직속된 프로퍼티가 아니면 [[Get]]처럼 [[Prototype]] 연쇄를 순회하기 시작하고 foo가 발견되지 않을 경우 foo라는 프로퍼티를 myObject 객체에 추가한 후 주어진 값을 할당

foo라는 프로퍼티명이 myObject 객체와 이 객체를 기점으로 한 [[Prototype]] 연쇄의 상위 수준 두 곳에서 동시에 발견될 때 이를 '가려짐'이라 함  
myObject에 직속한 foo 때문에 상위 연쇄의 foo가 가려지는 것  
이는 myObject.foo로 검색하면 언제나 연쇄의 최하위 수준에서 가장 먼저 foo 프로퍼티를 찾기 때문에 그럼

메서드 간 위임이 필요한 상황이면 메서드 가려짐으로 인해 보기 안 좋은 명시적 의사다형성이 유발됨  
가려짐은 그 이용 가치에 비해 지나치게 복잡하고 애매한 구석이 있으니 사용 X가 좋음

더욱이 가려짐은 아주 미묘하게 암시적으로 발생하는 경우도 있으니 주의해야 함

```javascript
var anotherObject = {
  a: 2,
};

var myObject = Object.create(anotherObject);

anotherObject.a; // 2
myObject.a; // 2

anotherObjct.hasOwnProperty("a"); // true
myObject.hasOwnProperty("a"); // false

myObject.a++; // 암시적 가려짐 발생

anotherObject.a; // 2
myObject.a; // 3

myObject.hasOwnProperty("a"); // true
```

겉보기엔 myObject.a++가 anotherObject.a 프로퍼티를 찾아 1만큼 값을 증가시킬 것 같지만 ++ 연산자는 결국 myObject.a = myObject.a + 1을 의미  
따라서 [[Prototype]]을 경유하여 [[Get]]을 먼저 찾고 anotherObject.a에서 현재 값 2를 얻은 뒤 1만큼 증가시킨 후, 그 결괏값을 다시 [[Put]]으로 myObject에 새로운 가려짐 프로퍼티 a를 생성한 뒤 할당

그러므로 위임을 통해 프로퍼티를 수정할 땐 조심해야 함

## 5.2 클래스

자바스크립트는 여타 클래스 지향 언어에서 제공하는 클래스라는 추상화된 패턴이나 설계가 전혀 없음  
객체만 존재  
실제로 자바스크립트는 클래스 없이 곧바로 객체를 생성할 수 있으므로 '객체 지향'이라는 이름표가 가장 어울리는, 몇 되지 않는 프로그래밍 언어임  
자바스크립트에서는 클래스에 객체의 작동을 서술하지 않음

### 5.2.1 클래스 함수

자바스크립트의 희한한 특성 탓에 외관은 클래스처럼 생긴 뭔가를 만들어 쓰려는 꼼수가 수년 동안이나 마구잡이로 남용됨

'일종의 클래스'같은 독특한 작동은 모든 함수가 기본으로 프로토타입이라는 공용/열거 불가 프로퍼티를 가진다는 이상한 특성에 기인함

```javascript
function Foo() {
  // ...
}

Foo.prototype; // { }
```

위 객체를 보통 Foo의 프로토타입이라고 하는데, 불행히도 Foo.prototype이라고 명명된 프로퍼티 레퍼런스를 통해 접근하기에 그렇게 부름

new Foo()로써 만들어진 모든 객체는 결국 'Foo 점 프로토타입' 객체와 [[Prototype]] 링크로 연결됨

```javascript
function Foo() {
  // ...
}

var a = new Foo();

Object.getPrototypeOf(a) === Foo.prototype; // true
```

new Foo()로 a가 생성될 때 일어나는 네 가지 사건 중 하나가 바로 Foo.prototype이 가리키는 객체를 내부 [[Prototype]]과 연결하는 것

클래스 지향 언어에서는 한 클래스를 다중 복사할 수 있음  
클래스 인스턴스화 자체가 '클래스 작동 계획을 실제 객체로 복사하는 것'이므로 인스턴스마다 복사가 발생

하지만 자바스크립트는 이러한 복사 과정이 전혀 없고 클래스에서 여러 인스턴스를 생서할 수도 없음  
어떤 공용 객체에 [[Prototype]]으로 연결된 객체를 다수 생성하는 것은 가능하나 기본적으로 어떠한 복사도 일어나지 않아서 결과적으로 자바스크립트에서 객체들은 서로 완전히 떨어져 분리되는 것이 아니라 끈끈하게 연결됨

new Foo()로 새 객체(a)가 만들어지고 이 객체는 Foo.prototype 객체와 내부적으로 [[Prototype]]과 연결이 맺어짐  
결국, 상호 연결된 두 개의 객체로 귀결됨

사실 new Foo() 호출 자체는 이러한 '링크'의 생성 프로세스와 거의 관련이 없음  
new Foo()는 결국 새 객체를 다른 객체와 연결하기 위한 간접적인 우회 방법인 셈

Object.create가 새 객체를 다른 객체와 연결하기 위한 직접적인 방법

##### 이름에는 무엇이 들어 있을까?

자바스크립트는 어떤 객체에서 다른 객체로 복사하는 게 아니라 두 객체를 연결함

[[Prototype]] 체계를 다른 말로 프로토타입 상속이라 하며 흔히 클래스 상속의 동적 언어 버전이라 함  
클래스 지향 세상에서 일반적인 '상속' 개념을 잘 살려 동적 스크립트 언어에 맞게 그 의미를 조금 변형한 장치

상속은 기본으로 복사를 수반하지만, 자바스크립트는 객체 프로퍼티를 복사하지 않음  
대신 두 객체에 링크를 걸어두고 한쪽이 다른 쪽의 프로퍼티/함수에 접근할 수 있게 위임함

'차등 상속'이란 어떤 객체의 작동을 더 일반적인 객체와 비교했을 대 어느 부분이 다른지 기술하는 아이디어

### 5.2.2 생성자

Foo.prototype 객체에는 기본적으로 열거 불가한 공용 프로퍼티 .constructor가 세팅되는데, 이는 객체 생성과 관련된 함수를 다시 참조하기 위한 레퍼런스임  
마찬가지로 '생성자' 호출 new Foo()로 생성한 객체 a도 .constructor 프로퍼티를 갖고 있어서 '자신을 생성한 함수'를 가리킬 수 있음

##### 생성자냐 호출이냐?

Foo는 '생성자'가 아닌 그냥 여느 함수일 뿐임  
함수는 결코 생성자가 아니지만, 그 앞에 new를 붙여 호출하는 순간 이 함수는 '생성자 호출'을 함  
사실, new 키워드는 일반 함수 호출을 도중에 가로채어 원래 수행할 작업 외에 객체 생성이라는 잔업을 더 부과하는 지시자임

```javascript
function NothingSpecial() {
  console.log("신경 쓰지 마!");
}

var a = new NothingSpecial();
// "신경 쓰지 마!"

a; // {}
```

NothingSpecial은 평범한 일반 함수지만, 이 함수를 new로 호출함으로써 객체가 생성되고 부수 효과로 생성된 객체를 변수 a에 할당함  
이것을 생성자 호출이라고 하지만 NothingSpecial 함수 자체는 생성자가 아님  
즉, 자바스크립트는 앞에 new를 붙여 호출한 함수를 모두 '생성자'라 할 수 있음  
함수는 결코 생성자가 아니지만 new를 사용하여 호출할 때에만 '생성자 호출'임

### 5.2.3 체계

```javascript
function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function () {
  return this.name;
};

var a = new Foo("a");
var b = new Foo("b");

a.myName(); // "a"
b.myName(); // "b"
```

이 예제는 두 가지 '클래스 지향' 꼼수를 사용

1. this.name = name 할당 시 .name 프로퍼티가 a, b 두 객체에 추가됨  
   마치 클래스 인스턴스에서 데이터값을 캡슐화하는 모습처럼 보임

2. Foo.prototype.myName = ... 부분이 아주 흥미로운 기법으로, 프로퍼티를 Foo.prototype 객체에 추가함
   그래서 놀랍게도 a.myName()처럼 사용 가능

a, b는 생성 직후 각자의 내부 [[Prototype]]이 foo.prototype에 링크됨  
myName은 a, b에서 찾을 수 없으므로 위임을 통해 Foo.prototype에서 찾음

##### 돌아온 '생성자'

.constructor은 Foo.prototype에 위임한 레퍼런스로서 a.constructor는 Foo를 가리킴

Foo에 의해 생성된 객체 a가 .constructor 프로퍼티를 통해 Foo에 접근할 수 있으나 이는 보안 측면에서는 바람직하지 않음

1. Foo.prototype의 .constructor 프로퍼티는 기본으로 선언된 Foo 함수에 의해 생성된 객체에만 존재  
   새로운 객체를 생성한 뒤 기본 .prototype 객체 레퍼런스를 변경하면 변경된 레퍼런스에도 .constructor가 따라붙진 않음

```javascript
function Foo() {
  /* .. */
}
Foo.prototype = {
  /* .. */
}; // 새 프로토타입 객체를 생성한다.

var a1 = new Foo();
a1.constructor === Foo; // false!
a1.constructor === Object; // true!
```

Foo()가 a1를 생성한 것으로 보이지만 사실 a1.constructor는 Foo가 아님

a1에는 .constructor 프로퍼티가 없으므로 [[Prototype]] 연쇄를 따라 올라가 Foo.prototype 객체에 위임함  
하지만 이 객체에도 .constructor 프로퍼티는 없으므로 계속 상위 객체로 위임하다가 결국 [[Prototype]] 연쇄 끝자락의 Object.prototype 객체에 이르게 됨  
이 객체는 .constructor 프로퍼티를 갖고 있으니 결국 내장 Object() 함수를 가리키게 된 것

또, .constructor는 불변 프로퍼티가 아님  
열거 불가지만 값은 쓰기가 가능하며 게다가 [[Prototype]] 연쇄에 존재하는 'constructor'라는 이름의 프로퍼티를 추가하거나 다른 값으로 덮어쓰는 것도 가능

[[Get]] 알고리즘이 [[Prototype]] 연쇄를 순회하는 방식 탓에 곳곳에 널려있는 .constructor 프로퍼티가 애초 예상과는 전혀 다른 객체를 가리킬 수도 있음

결론적으로 a1.constructor 같은 임의의 객체 프로퍼티는 실제로 기본 함수를 참조하는 레퍼런스라는 보장이 전혀 없음  
뭐 하나만 빠져도 a1.constructor는 전혀 엉뚱한 곳을 가리킬 가능성도 있음

a1.constructor는 매우 불안정하고 신뢰할 수 없는 레퍼런스이므로 될 수 있는 대로 코드에서 직접 사용하지 않는 것이 좋음

## 5.3 프로토타입 상속

```javascript
function Foo(name) {
  this.name = name;
}

Foo.function.myName = function () {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this.name);
  this.label = labgel;
}

// 'Bar.prototype'를 'Foo.prototype'에 연결한다.
Bar.prototype = Object.create(Foo.prototype);

// 여기서 조심! 이제 Bar.prototype.constructor'은 사라졌으니
// 이 프로퍼티에 의존하는 코드가 있다면 수동으로 일일이 '해결'해야 한다.

Bar.prototype.myLabel = function () {
  return this.label;
};

var a = new Bar("a", "obj a");

a.myName(); // "a"
a.myLabel(); // "obj a"
```

Object.create()를 실행하면 '새로운' 객체를 만들고 내부 [[Prototype]]을 지정한 객체에 링크함

Bar() { } 함수를 선언하면 Bar는 여타 함수처럼 기본으로 .prototype 링크를 자신의 객체에 갖고 있음

Bar.prototype = Foo.prototype처럼 할당한다고 Bar.prototype이 링크된 새로운 객체가 생성되진 않음

Bar.prototype = new Foo()로 할당하면 Foo.prototype과 링크된 새 객체가 생성되지만 그 과정에서 Foo()를 '생성자 호출' 함  
Foo 함수 본문이 내부적인 부수 효과로 가득하다면 연결 고리가 성립되는 싲머에 이런 부수효과까지 함께 발생

그러므로 Foo()의 부수 효과가 일어나지 않도록 Object.create()를 잘 사용해서 새로운 객체를 적절히 링크하여 생성해야 함

ES6부터 Object.setPrototypeOf() 유틸리티가 도입되면서 예측 가능한 표준 방법으로 새로운 객체 링크가 가능

### 5.3.1 클래스 관계 조사

전통적인 클래스 지향 언어에서는 인스턴스의 상속 계통을 살펴보는 것을 인트로스펙션(리플렉션)이라 함

```javascript
a instanceof Foo; // true
```

왼쪽에 일반 객체, 오른쪽에 함수를 피연산자로 둔 instanceof 연산자는 a의 [[Prototype]] 연쇄를 순회하면서 Foo.prototype가 가리키는 객체가 있는지 조사  
2개의 객체가 있으면 instanceof 만으로는 두 객체가 서로 [[Prototype]] 연쇄를 통해 연결되어 있는지 전혀 알 수 없음

**_내장 .bind() 유틸리티로 하드 바인딩 함수를 사용하면 .prototype 프로퍼티가 생기지 않는다. 이런 함수에 instanceof를 사용하면 하드 바인딩 함수의 출처인 대상 함수의 .prototype으로 대체된다. 하드 바인딩 함수를 써서 생성자를 호출하는 경우는 극히 드물지만 사용하면 원본 대상 함수를 대신 실행시키는 것과 같은 결과를 가져온다. 즉, 하드 바인딩 함수에 instanceof를 사용하면 원래 함수에 따라 작동한다._**

[[Prototype]] 리플렉션을 확인할 수 있는 훌륭한 대안이 존재

```javascript
Foo.prototype.isPrototypeOf(a); // true
```

isPrototypeOf()는 'a의 전체 [[Prototype]] 연쇄에 Foo.prototype이 있는가'라는 질문에 대답  
똑같은 원리지만 isPrototypeOf를 쓰면 간접적으로 참조할 함수의 .prototype 프로퍼티를 거치는 등의 잡다한 과정이 생략되는 장점이 존재

ES5부터 지원하는 표준 메서드를 사용하면 다음고 같이 [[Prototype]]을 곧바로 조회 가능

```javascript
Object.getPrototypeOf(a);
Object.getPrototypeOf(a) === Foo.prototype; // true
```

.constructor처럼 .\*\*proto\*\* 는 객체에 실재하는 프로퍼티가 아님  
실제로 이들은 다른 공용 유틸리티와 더불어 내장 객체 Object.prototype에 존재  
그리고 .\*\*proto\*\* 는 프로퍼티처럼 보이지만 실은 게터/세터에 가까움

따라서 a.\*\*proto\*\* 로 접근하는 것은 a.\*\*proto\*\*() 를 호출하는 것과 같음  
게터 함수는 Object.prototype 객체에 존재하지만 이 함수를 호출하면 this는 a로 바인딩 되며 결국 Object.getPrototypeOf(a)를 실행시키는 것과 비슷

.\*\*proto\*\* 프로퍼티는 ES6 Object.setPrototypeOf()를 사용하여 세팅할 수도 있지만 이미 존재하는 객체의 [[Prototype]]은 되도록 변경하지 않는 편이 좋음

## 5.4 객체 링크

[[Prototype]] 체계는 다른 객체를 참조하는 어떤 객체에 존재하는 내부 링크  
이 연결 고리는 객체의 프로퍼티/메서드를 참조하려고 하는데, 그런 프로퍼티/메서드가 해당 객체에 존재하지 않을 때 주로 활용됨  
엔진은 [[Prototype]]에 연결된 객체를 하나씩 따라가면서 프로퍼티/메서드를 찾아보고 발견될 때까지 같은 과정을 되풀이함  
이렇게 객체 사이에 형성된 일련의 링크를 '프로토타입 연쇄'라 함

### 5.4.1 링크 생성

```javascript
var foo = {
  something: function () {
    console.log("뭔가 대단한 걸 내게 보여줘...");
  },
};
var bar = Object.create(foo);
bar.something(); // 뭔가 대단한 걸 내게 보여줘..
```

Object.create()는 먼저 새로운 객체를 생성하고 주어진 객체와 연결함

**_Object.create(null)은 [[Prototype]] 링크가 빈 객체를 생성하므로 이젠 위임할 곳이 전혀 없다. 이런 객체는 프로토타입 연쇄 자체가 존재하지 않기 때문에 instanceof 연산 결과는 항상 false다. 이렇듯 빈 [[Prototype]]을 가진 객체는 특이하게도 [[Prototype]]이 위임된 프로퍼티/함수들로부터 어떠한 영향도 받을 일도 없고 일차원적인 데이터 저장소로 제격이므로 순수하게 프로퍼티에 데이터를 저장하는 용도로 사용하며, 이를 보통 '딕셔너리'라고 함_**

##### Object.create() 폴리필

Object.create()는 ES5부터 추가되어서 ES5 이전 환경까지 고려하면 Object.create()의 대역을 맡을 부분적인 폴리필이 필요함

```javascript
if (!Object.create) {
  Object.create = function (o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

이 폴리필은 우선 임시 함수 F를 이용하여 F.prototype 프로퍼티가 링크하려는 객체를 가리키도록 오버라이드함  
그런 다음 new F()로 원하는 연결이 수립된 새 객체를 반환

Object.create()의 두 번째 인자는 새로 만든 객체에 추가할 프로퍼티로서 각자 프로퍼티 서술자를 기재하여 속성 지정 가능

ES5 이전 환경에서 Object.create()의 기능이 필요하면 폴리필을 쓰지 말고 Object.create라는 이름이 전혀 들어있지 않은 완전한 새로운 유틸리티를 작성해서 써야 함

### 5.4.2 링크는 대비책?

```javascript
var anotherObject = {
  cool: function () {
    console.log("좋아!");
  },
};
var myObject = Object.create(anotherObject);
myObject.cool(); // "좋아!"
```

다른 개발자가 myObject.cool() 호출 시 myObject에 cool() 메서드가 없어도 정상으로 처리되게 소프트웨어를 설계하는 식으로 API에 강력한 '마법'을 걸어놓으면 훗날 유지 보수를 수행할 담당자를 적잖이 당황하게 할지 모름

API 인터페이스 설계 시 구현 상세를 겉으로 노출하지 않고 내부에 감추는 식으로 위임하면 특별히 이상하거나 혼동할 일은 없음

## 5.5 정리하기

객체에 존재하지 않는 프로퍼티를 접근하려고 시도하면 [[Get]]은 해당 객체의 내부 [[Prototype]] 링크를 따라 다음 수새 장소를 결정  
프로퍼티를 찾아 이 객체에서 저 객체로 순회하기 위한 연결 경로는 '프로토타입 연쇄'에 잘 정의되어 있음

모든 일반 객체의 최상위 프로토타입 연쇄에는 내장 Object.prototype이 버티고 있음  
결국, 이 지점까지 이르러서도 발견되지 않으면 프로퍼티 수색은 그대로 종료됨

두 객체를 서로 연결 짓는 가장 일반적인 방법은 함수 호출 시 new 키워드를 앞에 붙이는 것

새로운 객체와 손잡은 '다른 객체'는 new를 이용하여 호출한 함수의 .prototype이라고 임의로 명명한 프로퍼티를 통해 참조 가능  
여기서 new로 호출한 함수를 '생성자'라고 보통 일컫는데, 여타의 클래스 지향 언어에서 말하는 생성자와는 개념이 전혀 다름

자바스크립트 체계가 전통적인 클래스 지향 언어의 '클래스 인스턴스화 및 클래스 상속'과 유사해 보이지만 자바스크립트에서는 복사가 일어나지 않는다는 결정적인 차이가 있음  
그러나 객체는 결국 다른 객체와 내부 [[Prototype]] 연쇄를 통해 연결됨

사실 자바스크립트 객체 간의 관계는 복사되는 게 아니라 위임 연결이 맺어진 것이므로 '위임'이라고 해야 더 적절한 표현임
