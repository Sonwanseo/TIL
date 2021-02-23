# 2020-10-06 React-redux

### Connect
connect함수는 Provider 컴포넌트 하위에 존재하는 컴포넌트들이 store에 접근하게 만드는 역할을 해준다.

### mapStateToProps
mapStateToProps는 connect 함수에 첫 번째 인수로 들어가는 함수 혹은 객체이다.
mapStateToProps는 기본적으로 store가 업데이트 될 때마다 자동적으로 호출이 된다.
이를 원하지 않는다면 null 혹은 undefined 값을 제공해야 한다.

### mapDispatchToProps
mapDIspatchToProps는 connect 함수의 두 번째 인자로 사용된다.
이것은 기본적으로 store에 접근한 컴포넌트가 store의 상태를 바꾸기 위해 dispatch를 사용할 수 있게 만들어준다.

### 질문
1. redux를 사용하면 스토어의 값을 컴포넌트가 dispatch하여 바꾸고 스토어의 값을 사용할 수 있는 것 아닌가? 왜 react-redux의 connect 함수로 다시 연결해야 하는가.
-> mapStateToProps를 정의만 한다면 단지 함수에 불과하다. mapStateToProps는 state가 변경될 때마다 호출되어야 하는 데 이 역할을 하게 해주는 것이 connect이다. (connect의 매개변수로 넘겨주는 컴포넌트에서 mapStateToProps를 props로 받아 사용할 수 있다.)
2. redux와 react-redux의 차이는 무엇인가?
-> redux를 사용한 flux 구조에서 오는 단점, 그리고 redux 자체가 쓰기가 복잡하다
react-redux를 쓰는 이유는 기존의 redux를 쓰게 되면 필연적으로 react의 코드 구조에 변화가 온다. 이를 최대한 막아준다. 또한, redux 구조를 쓰면 모듈화해서 사용하기 불편해지고 다른 모듈에서 쓰기도 까다로운데 react-redux를 쓰면 편해진다.

참고
- https://velog.io/@jeonghoheo/Redux-React-%EC%9A%94%EC%95%BD
- https://kamang-it.tistory.com/entry/React-12react-redux%EB%A1%9C-redux%EB%8D%94-%EC%A7%81%EA%B4%80%EC%A0%81%EC%9D%B4%EA%B2%8C-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0