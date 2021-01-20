# 2021-01-20

## 얕은 복사 vs 깊은 복사

자바스크립트에서 값은 원시값과 참조값으로 나뉨

원시값

- Number
- String
- Boolean
- Null
- Undefined
- Symbol

참조값

- Object

원시값은 값을 복사할 때 복사된 값을 다른 메모리에 할당하기 때문에 원래의 값과 복사된 값이 서로에게 영향을 미치지 않음  
하지만 참조값은 변수가 객체의 주소를 가리키는 값이기 때문에 복사된 값(주소)이 같은 값을 가리킴

이러한 특징때문에 복사는 두 종류로 나뉨

### 얕은 복사

얕은 복사란, 객체를 복사할 때 원래값과 복사값이 같은 참조를 가리키고 있는 것을 말함  
객체안에 객체가 있을 경우 한 개의 객체라도 원본 객체를 참조하고 있다면 이를 얕은 복사라고 함

자바스크립트에서 얕은 복사를 하는 방법

1. Object.assign()
2. 전개연산자(...)

```javascript
var originalArray = [1, 2, 3, 4];
var newArray = originalArray;

originalArray[0] = 200;

alert(originalArray); // [200, 2, 3, 4]
alert(newArray); // [200, 2, 3, 4]
```

### 깊은 복사

깊은 복사란, 객체 안의 객체의 참조 값도 완전히 원시 데이터 값으로 복사하는 것을 말함

자바스크립트에서 깊은 복사를 하는 방법

1. JSON 객체
2. JSON 객체 + eval()

```javascript
var originalValue = 100;
var newValue = originalValue;

originalValue = 200;

alert(originalValue); // 200
alert(newValue); // 100
```

### 참고

- https://velog.io/@th0566/Javascript-%EC%96%95%EC%9D%80-%EB%B3%B5%EC%82%AC-%EA%B9%8A%EC%9D%80-%EB%B3%B5%EC%82%AC
- https://wanna-b.tistory.com/18
- https://falsy.me/javascript-6-%EA%B0%9D%EC%B2%B4%EC%9D%98-%EC%96%95%EC%9D%80-%EB%B3%B5%EC%82%AC%EC%99%80-%EA%B9%8A%EC%9D%80-%EB%B3%B5%EC%82%AC%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84%EB%B4%85%EB%8B%88%EB%8B%A4/
