# Chapter 10. 제너레이터

비동기 흐름 제어를 순차적/동기적 모습으로 나타내는 장치

## 10.1 완전-실행을 타파하다

완전-실행: 일단 함수가 실행되기 시작하면 완료될 때까지 계속 실행되며 도중에 다른 코드가 끼어들어 실행되지 않는 법칙

But, ES6부터는 완전-실행 법칙을 따르지 않는, 제너레이터라는 새로운 종류의 함수가 등장

선점형 멀티스레드 언어라면 일반적으로 두 문 사이의 특정 시점에 다른 함수가 끼어들어 실행되게 할 수 있지만 자바스크립트는 선점형 언어도, 멀티스레드 언어도 아님  
하지만 함수 자체가 어떤 코드 부분에서 멈춤 신호를 준다면 이러한 끼어들기가 가능

```javascript
var x = 1;

function* foo() {
  x++;
  yield; // 멈추시오!
  console.log("x:", x);
}

function bar() {
  x++;
}
```

**_제너레이터 함수를 보면 2가지 종류가 있다. function_ foo()와 function _foo(). 이는 그저 코딩 스타일의 차이일 뿐이다._**

```javascript
// 이터레이터 'it'를 선언하여 제너레이터를 제어한다.
var it = foo();

// 'foo()'는 여기서 시작된다!
it.next();
x; // 2
bar();
x; // 3
it.next(); // x: 3
```

1. var it = foo(); 할당으로 \*foo() 제너레이터가 실행되는 것은 아님  
   제너레이터 실행을 제어할 이터레이터만 마련
2. 이터레이터.next()로 다음 실행을 제어  
   yield; 부분에서 멈춤
3. 제너레이터가 진행을 멈춘 동안 bar()를 실행
4. 이터레이터.next()로 다음 실행을 제어

제너레이터는 1회 이상 시작/실행을 거듭할 수 있으면서도 반드시 끝까지 실행해야 할 필요는 없는 특별한 함수

### 10.1.1 입력과 출력

제너레이터도 함수이기 때문에 기본적인 체계, 즉 인자를 받고 어떤 값을 반환하는 기능은 일반 함수와 같음

하지만 여타 함수와 제너레이터의 호출 방법은 다름  
이전 코드에서 볼 수 있듯이 제너레이터는 var it = foo();를 선언하는 것만으로는 실행되지 않음  
이터레이터.next();를 해야 다음 yield 또는 제너레티어 끝까지 실행할 수 있음

next()의 결괏값은 \*foo()가 반환한 값을 value 프로퍼티에 저장한 객체

##### 반복 메시징

인자를 받아 결괏값을 내는 기능 외에도 제너레이터에는 yield와 next()를 통해 입력/출력 메시지를 주고받는 기능이 탑재되어 있음

```javascript
function* foo(x) {
  var y = x * (yield);
  return y;
}

var it = foo(6);

// 'foo()'를 시작한다.
it.next();

var res = it.next(7);

res.value; // 42
```

1. 인자 x 자리에 6을 넘기고 it.next()를 호출하여 *foo()를 시작  
   *foo()에서 var y = x ... 문이 처리될 즈음 yield에서 멈춤
2. 인자 x 자리에 7을 넘기고 it.next()를 호출하여 \*foo()에 yield 이하의 코드가 실행되게 함
3. var y = 6 \* 7;이 되고 반환값으로 value 프로퍼티에 return y;를 한 객체가 반환됨

##### 두 가지 질문

위 코드를 보고 yield는 한 개지만, next()가 두 개이므로 짝이 안맞는다고 생각할 수도 있음  
하지만 첫 번째 next()는 yield 전까지의 흐름을 제어하고, 두 번째 next()는 yield가 속해 있는 괄호부터 \*foo()의 return 문까지를 제어하기 때문에 짝이 맞음

제너레티어 함수는 양방향 메시징이 가능함  
표현식 yield...는 next() 호출에 대응하여 메시지를 보낼 수 있고 next()는 멈춘 yield표현식으로 값 전송이 가능

제너레이터 끝에 return 문이 따로 없으면 return 문이 있다고 치고 암시적으로 처리

이러한 질의 응답 체계는 매우 강력함

### 10.1.2 다중 이터레이터

구문 사용법만 놓고 보면 이터레이터로 제너레이터를 제어하는 건 선언된 제너레티어 함수 자체를 제어하는 것처럼 보임  
이터레이터를 생성할 때마다 해당 이터레이터가 제어할 제너레이터의 인스턴스 역시 암시적으로 생성됨

같은 제너레이터의 인스턴스를 동시에 여러 개 실행할 수 있고 인스턴스끼리 상호 작용도 가능

```javascript
function* foo() {
  var x = yield 2;
  z++;
  var y = yield x * z;
  console.log(x, y, z);
}

var z = 1;

var it1 = foo();
var it2 = foo();

var val1 = it1.next().value; // 2 <-- yield 2
var val2 = it2.next().value; // 2 <-- yield 2

val1 = it1.next(val2 * 10).value; // 40 <-- x: 20, z: 2
val2 = it2.next(val1 * 5).value; // 600 <-- x: 200, z: 3

it1.next(val2 / 2); // y: 300
// 20 300 3
it2.next(val1 / 4); // y: 10
// 200 10 3
```

**_똑같은 제너레이터의 여러 인스턴스를 동시에 실행하는 가장 일반적인 상황은 독립적으로 연결된 자원으로부터 입력값 없이 제너레이터 스스로 값을 생산할 때다. 인스턴스 간 상호 작용이 주가 아니다._**

1. \*foo() 인스턴스 2개를 동시에 실행하고 두 next() 호출 모두 yield 2 지점에서 2 값을 각각 넘겨받음
2. val2 \* 10은 2 \* 10이고 이 값은 첫 번째 인스턴스 it1에 전달되어 x 값은 20이 됨  
   z 값은 1에서 2로 증가하고 20 \* 2를 yield하므로 val1은 40이 됨
3. val1 \* 5는 40 \* 5이고 이 값은 두 번째 인스턴스 it2에 전달되어 x 값은 200이 됨  
   z 값은 다시 2에서 3으로 증가하고 200 \* 3을 yield하면 val2는 600이 됨
4. val2 / 2는 600 / 2이고 it1로 전달되어 y 값은 300이 되고 콘솔창엔 x y z 값이 20 300 3으로 각각 표시됨
5. val1 / 4는 40 / 4이고 it2로 전달되어 y 값은 10이 되고 콘솔창엔 200 10 3이 표시됨

##### 인터리빙

```javascript
var a = 1;
var b = 2;

function foo() {
  a++;
  b = b * a;
  a = b + 3;
}

function bar() {
  b--;
  a = 8 + b;
  b = a * 2;
}
```

일반 자바스크립트 함수 foo(), bar() 둘 중 하나는 다른 함수보다 먼저 완전-실행될 것임  
하지만 foo()의 개별 문을 bar()에 인터리빙하여 실행하는 것은 불가능

반면 제너레이터는 문 사이에서도 인터리빙이 가능

같은 변수를 공유한 상태에서 두 제너레이터의 이터레이터를 인터리빙 함으로써 이론적 스레드 경합 조건이 발생하는 환경을 재현할 수 있음

## 10.2 값을 제너레이팅

### 10.2.1 제조기와 이터레이터

이터레이터는 생산자로부터 일련의 값들을 받아 하나씩 거치기 위한, 명확한 인터페이스  
대다수의 다른 언어처럼 자바스크립트에서도 이터레이터 인터페이스는 생산기에서 다음 값이 필요할 때마다 next()를 호출함

```javascript
var something = function () {
  var nextVal;

  return {
    // 'for...of' 루프에서 필요하다.
    [Symbol.iterator]: function () {
      return this;
    },

    // 표준 이터레이터 인터페이스 메서드
    next: function () {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = 3 * nextVal + 6;
      }

      return {
        done: false,
        value: nextVal,
      };
    },
  };
};
```

next()를 호출하면 프로퍼티가 2개인 객체가 반환됨  
done은 이터레이터 완료 상태를 기리키는 불리언 값이고 value는 순회값

ES6는 for...of 루프를 지원하여 표준 이터레이터를 자동으로 기존 루프 형태로 쓸 수 있음

```javascript
for (var v of something) {
  console.log(v);

  // 무한 루프가 되지 않게 하라!
  if (v > 500) {
    break;
  }
}
// 1 9 33 105 321 969
```

for...of 루프는 매번 자동으로 next()를 호출하다가 done: true를 받으면 그 자리에서 멈춤

이터레이터를 직접 수동 순회하는 것도 가능함

손수 이터레이터를 제작해도 상관없지만 ES6부터 배열 같은 자바스크립트 내장 자료 구조 대부분에는 기본 이터레이터가 장착되어 있음

**_일반 객체엔 배열처럼 기본 이터레이터가 없다._**

### 10.2.2 이터러블

next() 메서드로 인터페이스하는 객체를 '이터레이터'라고 함  
하지만 순회 가능한 이터레이터를 포괄한 객체, '이터러블'이 더 밀접한 용어

ES6부터 이터러블은 특별한 ES6 심볼값 Symbol.iterator라는 이름을 가진 함수를 지니고 있어야 이 함수를 호출하여 이터러블에서 이터레이터를 가져올 수 있

for...of루프는 자동으로 Symbol.iterator 함수를 호출하여 이터레이터를 생성  
수동으로 함수를 호출하여 이 함수가 반환한 이터레이터를 사용할 수도 있음

```javascript
var a = [1, 3, 5, 7, 9];

var it = a[Symbol.iterator]();

it.next().value; // 1
it.next().value; // 3
it.next().value; // 5
```

### 10.2.3 제너레이터 이터레이터

제너레이터는 일종의 값을 생산하는 공장이며, 이렇게 만들어진 값들은 이터레이터 인터페이스의 next()를 호출하여 한 번에 하나씩 추출할 수 있음

따라서 제너레이터 자체는 이터러블이 아니지만 아주 흡사해서 제너레이터를 실행하면 이터레이터를 돌려받게 됨

##### 제너레이터 멈춤

일반적으로 break, return 또는 잡히지 않은 예외로 인해 for...of 루프가 '비정상 완료'되면 제너레이터의 이터레이터를 중지하도록 신호를 줌

**_엄밀히는 루프가 정상 완료될 경우에도 for...of 루프는 이터레이터에게 신호한다. 제너레이터 관점에선 어차피 자신의 이터레이터가 먼저 끝나야 for...of 루프 역시 완료되므로 별 의미는 없다. 그러나 커스텀 이터레이터는 for...of 루프를 사용하는 코드로부터 부가적인 신호를 받는 경우가 있다._**

for...of 루프가 자동으로 전송하는 신호를 수동으로 이터레이터에 보내야 할 경우도 있음  
이럴 때 return()을 호출

제너레이터가 외부적으로 완료된 다음에도 내부에서 try...finally 절을 사용하면 실행할 수 있음  
이는 자원을 정리할 때 유용한 기법

```javascript
function* something() {
  try {
    var nextVal;

    while (true) {
      if (nextVal === undefined) {
        nextVal = 1;
      } else {
        nextVal = 3 * nextVal + 6;
      }
      yield nextVal;
    }
  } finally {
    // 정리 코드
    console.log("정리 완료!");
  }
}
```

it.return()하면 제너레이터 실행은 즉시 끝나고 finally 절로 옮겨짐

## 10.3 제너레이터를 비동기적으로 순회

yield를 메시지 전달 수단이 아닌 멈춤/중단을 위한 흐름 제어 수단으로도 사용 가능

p.314 ~ 317 참고

### 10.3.1 동기적 에러 처리

```javascript
try {
  var text = yield foo(11, 31);
  console.log(text);
} catch (err) {
  console.error(err);
}
```

위 코드에서 foo()가 실행을 끝내고 AJAX 응답을 text에 할당할 준비를 마칠 때까지 yield가 이 할당문을 멈추게 함  
하지만 이 yield로 제너레이터가 에러를 잡을 수 있게 잠시 멈추게 하는 것도 가능

이러한 제너레이터의 yield-멈춤 기능은 비동기 함수 호출로부터 넘겨받은 값을 동기적인 형태로 return하게 해줄 뿐만 아니라 비동기 함수 실행 중 발생한 에러를 동기적으로 catch할 수 있게도 해줌

제너레이터 안쪽으로 에러를 던질 수 있을 뿐만 아니라 제너레이터 밖으로도 에러를 던져서 catch할 수 있음

```javascript
function* main() {
  var x = yield "Hello World";
  yield x.toLowerCase(); // 예외를 일으킨다!!
}

var it = main();

it.next().value; // Hello World

try {
  it.next(42);
} catch (err) {
  console.error(err); // TypeError
}
```

비동기 코드에서 난 에러를 동기적인 모양새로 처리할 수 있다는 것은 코드 가독성, 추론성 면에서 매우 큰 강점

## 10.4 제너레이터 + 프라미스

제너레이터를 비동기적으로 순회할 수 있다는 사실만으로도 순차적 추론성 측면에서 엄청난 발전  
하지만 프라미스의 믿음성과 조합성도 매우 중요함

ES6의 백미가 바로 제너레이터와 프라미스의 만남

이터레이터는 프라미스가 귀결되기를 리스닝하고 있다가 제너레이터를 이룸 메시지로 재개하든지 아니면 제너레이터로 버림 사유로 채워진 에러를 던짐

### 10.4.1 프라미스-인식형 제너레이터 실행기

프라미스를 yield하는 제너레이터를 실행하도록 설계된 유틸리티 구현

```javascript
function run(gen) {
  var args = [].slice.call(arguments, 1), it;

  // 현재 콘텍스트에서 제너레이터를 초기화한다.
  it = gen.apply(this, args);

  // 제너레이터 완료를 의미하는 프라미스를 반환한다.
  return Promise.resolve()
    .then(function handleNext(value) {
      // 다음 yield된 값까지 실행한다.
      var next = it.next(value);

      return (function handleResult(next) {
        // 제너레이터 실행이 끝났다면,
        if(next.done) {
          return next.value;
        }
        // 아니면 계속 실행한다.
        else {
          return Promise.resolve(next.value)
            .then(
              // 성공 시 귀결 값을 제너레이터로 반환하면서
              // 비동기 루프를 재개한다.
              handleNext,

              // 'value'가 버림 프라미스면
              // 제너레이터 자신이 에러를 처리하게끔
              // 거꾸로 에러를 전파한다.
              function handleErr(err) {
                return Promise.resolve(
                  it.throw(err);
                )
                .then(handleResult);
              }
            )
        }
      })(next);
    })
}
```

손수 작성하기에 코드가 꽤 복잡함

run()은 AJAX 예제의 \*main()에서 다음과 같이 사용

```javascript
function* main() {
  // ...
}

run(main);
```

run 내부 로직에 따라 주어진 제너레이터를 비동기적으로 완료할 때까지 알아서 진행함

**_run()은 제너레이터가 완료되면 바로 귀결되는 프라미스를 반환하거나 이 프라미스를 제너레이터가 처리하지 않으면 잡히지 않은 에러를 수신한다._**

##### async와 await?

제너레이터가 프라미스를 yield하고 나중에 이 프라미스가 제너레이터의 이터레이터를 제어하여 끝까지 진행하는, 이런 패턴은 매우 강력하고 쓸모가 있음

async function 하면 프라미스를 await할 경우 해야 할 일, 즉 프라미스가 귀결될 때까지 이 함수를 멈추게 할 거란 사실을 자동으로 인식

### 10.4.2 제너레이터에서의 프라미스 동시성

실제 비동기 코드는 보통 여러 단계로 구성됨

프라미스의 모든 동시성 능력을 제너레이터 + 프라미스 방식으로 이용 가능

##### 프라미스 숨김

제너레이터로 비동기성을 나타내는 방법은 단순 + 순차적 + 동기적인 형태의 코드를 작성하면서도 가능한 한 비동기 관련 세부분은 감추고자 하는 의도가 지배적

프라미스 로직을 어떤 함수 안에 감추고 이 함수를 제너레이터에서 그냥 호출하는 식으로 코드를 작성하는 것은 흐름 제어를 정교하게 다루어야 할 때 특히 유용

세부 로직은 반드시 제너레이터 코드로부터 멀찌감치 떨어뜨리고 의도적으로 추상화시켜 놓아야 더 상위 수준의 작업을 표현하기 편함

기능 좋고 성능 좋은 코드를 작성하는 것도 좋지만 항상 되도록 추론성과 유지 보수성이 나은 코드를 작성하려고 노력해야 함

## 10.5 제너레이터 위임

제너레이터 내부에서 일반 함수를 이용하면 구현 상세를 추상화시켜 로직을 감출 수 있는 장점이 있지만, 일반 함수 규칙에 맞게끔 작동하기 때문에 제너레이터처럼 yield에서 멈추게 할 수 없는 점이 가장 큰 단점

```javascript
function* foo() {
  console.log("'*foo()' 시작");
  yield 3;
  yield 4;
  console.log("'*foo()' 끝");
}

function* bar() {
  yield 1;
  yield 2;
  yield* foo(); // 'yield'-위임!
  yield 5;
}

var it = bar();

it.next().value; // 1
it.next().value; // 2
it.next().value; // '*foo()' 시작
// 3
it.next().value; // 4
it.next().value; // '*foo()' 끝
// 5
```

*foo() 호출을 *bar() 함수 내부에서 했고, yield를 통해 호출했기 때문에 it.next()는 \*foo() 내부에서 순회함

it 이터레이터로 전체 *foo() 이터레이터를 훑고나면 자동으로 제어권은 *bar()로 넘어옴

**_yield \*가 내어주는 건 이터레이터 제어권이지 제너레이터 제어권이 아니다. yield-위임은 실제로 모든 '이터러블'에 가능하다._**

### 10.5.1 왜 위임을?

yield-위임을 하는 목적은 주로 코드를 조직화하고 그렇게 해서 일반 함수 호출과 맞추기 위함

제너레이터도 일반 함수과 마찬가지로 분리 배치하는 편이 프로그램 가독성, 유지 보수성, 디버깅 측면에서 유리함  
이런 점에서 yield *는 *bar() 내부에서 \*foo()의 실행 단계를 수동으로 순회할 때 사용하는 단축 구문임

### 10.5.2 메시지 위임

yield-위임은 이터레이터뿐 아니라 양방향 메시징에도 쓰임

yield-위임은 제너레이터가 아닌 일반 '이터러블'에도 쓸 수 있음

양방향 메시징을 수행하는 yield-위임은 에러/예외도 같은 식으로 양방향 배달을 해줌

### 10.5.3 비동기성을 위임

p. 337 참고

### 10.5.4 위임 '재귀'

yield-위임은 위임 단계가 많아도 잘 따라감  
그래서 비동기형 제너레이터의 재귀, 즉 스스로에게 yield-위임하는 제너레이터 작성 시에도 사용 가능

```javascript
function* foo(val) {
  if (val > 1) {
    // 제너레이터 재귀
    val = yield* foo(val - 1);
  }
  return yield request("http://some.url/?v=" + val);
}

function* bar() {
  var r1 = yield* foo(3);
  console.log(r1);
}

run(bar);
```

**_run()을 run(foo, 3)으로 호출해도 된다. 제너레이터 초기화 시 전달할 추가 인자를 지원하기 때문이다._**

코드가 이해가 안된다면 p.338 참고하자

## 10.6 제너레이터 동시성

동시 실행 중인 두 프로세스는 협동적으로 각자의 작업을 인터리빙 할 수 있고 많은 경우에서 아주 강력한 비동기 표현식 구사 가능

p. 339 ~ 343 참고

## 10.7 썽크

일반 컴퓨터 과학에 썽크라는, 자바스크립트 이전에 등장한 개념이 존재  
다른 함수를 호출할 운명을 가진 인자가 없는 함수를 말함

다시 말하면 어떤 함수 정의부를 또 다른 함수 호출부로 감싸 실행을 지연시키는데 여기서 감싼 함수가 바로 썽크  
따라서 나중에 썽크를 실행하면 결국 원래 함수를 호출하는 것과 같음

```javascript
function foo(x, y) {
  return x + y;
}

function fooThunk() {
  return foo(3, 4);
}

// 나중에
console.log(fooThunk()); // 7
```

동기적 썽크는 직관적  
비동기 썽크는 콜백을 수신하는 기능까지 포함하여 한정된 썽크의 범위 확장

```javascript
function foo(x, y, cb) {
  setTimeout(function () {
    x + y;
  }, 1000);
}

function fooThunk(cb) {
  foo(3, 4, cb);
}

// 나중에
fooThunk(function (sum) {
  console.log(sum); // 7
});
```

### 10.7.1 s/promise/thunk

썽크와 프라미스는 작동 개념이 동등하지 않아 직접적인 상호 호환성은 없음  
있는 그대로의 썽크와 비교하면 프라미스가 훨씬 더 좋음

하지만 둘 다 어떤 값을 요청하여 비동기적 응답을 받는다는 점은 같음

썽크와 프라미스는 대칭 관계

이런 관점으로 보면 제너레이터는 비동기성 프라미스 대신 비동기성 썽크를 yield해도 됨

p. 349 코드 참고

썽크 자체는 프라미스의 믿음성/조합성을 거의 보장하지 못함  
썽크를 특정한 제너레이터의 비동기 패턴에서 프라미스 대용으로 쓸 수는 있으나 프라미스가 제공하는 혜택을 생각하면 이상적인 해결책은 아님

## 10.8 ES6 이전 제너레이터

제너레이터는 ES6 이후에 나온 신생 구문이므로 프라미스처럼 단순 폴리필이 불가능

다행히 ES6에서 새로 확장된 구문 중 트랜스파일러라는 도구 덕분에 어떤 ES6 구문을 이에 상응하는 ES6 이전 코드로 변환 가능  
제너레이터 코드 역시 ES5 이하 환경에서 똑같이 작동하게끔 트랜스파일이 가능

### 10.8.1 수동 변환

```javascript
// 'request()'는 프라미스-인식형 유틸리티다.

function* foo(url) {
  try {
    console.log("요청 중:", url);
    var val = yield request(url);
    console.log(val);
  } catch (err) {
    console.log("에러:", err);
    return false;
  }
}

var it = foo("http://some.url.1");
```

일단 호출 가능한 일반 함수 foo()가 필요하고 이 함수는 이터레이터를 반환해야 한다는 것을 알 수 있음

p. 351 ~ 356 참고

### 10.8.2 자동 변환

ES6 제너레이터를 자동 변환하는 툴 중 페이스북 개발자들이 만든 리제너레이터라는 툴이 있음

p. 356 ~ 358 참고

## 10.9 정리하기

제너레이터는 ES6부터 도입된 새로운 유형의 함수로, 일반 함수처럼 완전-실행하지 않고 실행 도중 멈출 수 있고 멈춘 지점에서 나중에 다시 시작할 수도 있음

멈춤/재개가 번갈아 일어나므로 제너레이터는 선점적이라기보다는 협동적인 툴  
yield 키워드를 이용하여 스스로 멈출 수 있고 이 제너레이터를 제어하는 이터레이터는 제너레이터를 다시 시작할 수 있음

yield / next() 이중성은 제어 장치뿐 아니라 양방향 메시징 체계로도 실질적인 활용이 가능  
yield ... 표현식은 일단 멈추고 어떤 값을 기다리게 하고 next() 호출은 이렇게 멈춘 yield 표현식에 값을 전해줌

비동기 흐름 제어와 연관된 제너레이터의 핵심은 제너레이터 내부 코드가 동기/순차적 형태로 일련의 자업 단계를 자연스럽게 표현할 수 있는 능력  
그 비결은 바로 yield 키워드 뒷편에 숨겨진 잠재적인 비동기성에 있음  
즉, 제너레이터의 이터레이터가 제어하는 코드로 비동기성을 옮겨놓은 것
