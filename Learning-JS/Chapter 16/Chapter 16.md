# Chapter 16. Math

### 16.1 숫자 형식

자바스크립트는 다양한 숫자 형식을 지원하지는 못한다.

자바스크립트의 숫자 형식 메서드는 모두 숫자가 아니라 문자열을 반환한다.
해당 형식에 필요한 각종 기호를 온전히 표현하려면 반드시 문자열이어야 하기 때문이다(물론 이런 문자열은 쉽게 숫자로 바꿀 수 있다).
따라서 숫자 형식을 바꾸는 건 실제로 표시하기 직전에 해야 한다.
숫자를 저장하거나 계산할 때는 따로 형식을 지정하지 않은 숫자 타입이어야 한다.

#### 16.1.1 고정 소수점

소수점 뒤 자릿수를 지정하는 형식을 원한다면 toFixed()를 사용한다.

이 숫자는 버림이 아니라 반올림이다.

#### 16.1.2 지수 표기법

지수 표기법이 필요할 때는 toExponential()을 사용한다.

toFixed()와 마찬가지로 반올림한 결과가 출력력된다.
매개변수로 넘긴 정밀도에 따라 소수점 뒤에 숫자가 몇 개 나타날지 정해진다.

#### 16.1.3 고정 전체 자리수

소수점이 어디 나타나든 관계없이 숫자 몇 개로 표현하느냐가 중요하다면 toPrecision()을 사용한다.

출력 결과는 반올림된 숫자이며 전체 자릿수는 매개변수로 넘긴 자릿수와 일치한다.
필요할 경우 지수 표기법을 사용한다.

#### 16.1.4 다른 진수

2진수나 8진수, 16진수 표현을 원한다면 toString()에 기수를 매개변수로 쓰면 된다.

#### 16.1.5 고급 숫자 형식

Numeral.js

### 16.2 상수

Math 객체에는 몇 가지 중요한 상수가 프로퍼티로 내장돼 있다.

#### 16.3.1 거듭제곱

제곱 관련 기본 함수는 Math.pow이며 제곱근, 세제곱근, e의 거듭제곱 등 자주 쓰이는 연산에는 간편 함수가 있다

[p. 335 표 참고]

#### 16.3.2 로그 함수

자연로그 함수는 Math.long이다.
상용로그를 log, 자연로그를 ln이라고 표현하는 언어도 있으므로 자바스크립트의 log는 자연로그라고 기억해야 한다.
ES6에서는 자주 쓰이는 상용로그 Math.log10 함수가 생겼다.

[p. 336 표 참고]

#### 16.3.3 기타 함수

[p. 336 표 참고]

#### 16.3.4 의사 난수 생성

자바스크립트에서 의사 난수를 생성할 때는 Math.random()을 사용한다.
이 함수는 0 이상 1 미만의 숫자를 반환한다.

[p. 337 표 참고]

### 16.4 삼각 함수

자바스크립트의 삼각함수는 모두 라디안 값을 기준으로 한다.

매개변수에 각도를 쓸 수 없으므로 라디안 값으로 바꿔야 한다.
계산은 쉽다.
180으로 나누고 파이를 곱하면 된다.
보조 함수를 만들기도 쉽다.

[p. 338 표 참고]

### 16.5 쌍곡선함수

[p. 339 표 참고]
