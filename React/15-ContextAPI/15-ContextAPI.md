# React 15. Context API

Context API는 리액트 프로젝트에서 전역적으로 사용할 데이터가 있을 때 유용한 기능

## 1. Context API를 사용한 전역 상태 관리 흐름 이해하기

리액트 애플리케이션은 컴포넌트 간에 데이터를 props로 전달하기 때문에 컴포넌트 여기저기서 필요한 데이터가 있을 때는 주로 최상위 컴포넌트인 App의 state에 넣어서 관리

리덕스나 MobX 같은 상태 관리 라이브러리를 사용하여 전역 상태 관리 작업을 더 편하게 처리
리액트 v16.3 업데이트 이후에는 Context API가 많이 개선되었기 때문에 별도의 라이브러리를 사용하지 않아도 전역 상태를 손쉽게 관리
Context API를 사용하면 Context를 만들어 단 한 번에 원하는 값을 받아 와서 사용 가능

## 2. Context API 사용법 익히기

새 Context를 만들 때는 createContext 함수를 사용함
파라미터에는 해당 Context의 기본 상태를 지정

ColorBox라는 컴포넌트를 만들어서 ColorContext 안에 들어 있는 색상을 보여 주는데, 이때 색상을 props로 받아 오는 것이 아니라 ColorContext 안에 들어 있는 Consumer라는 컴포넌트를 통해 색상을 조회함

Consumer 사이에 중괄호를 열어서 그 안에 함수를 넣어 줌
이러한 패턴을 Function as a child, 혹은 Render Props라고 함
컴포넌트의 children이 있어야 할 자리에 일반 JSX 혹은 문자열이 아닌 함수 전달

Provider를 사용하면 Context의 value를 변경 가능

기존에 createContext 함수를 사용할 때는 파라미터로 Context의 기본값을 전달
이 기본값은 Provider를 사용하지 않았을 때만 사용됨
만약 Provider는 사용했는데 value를 명시하지 않았다면, 이 기본값을 사용하지 않기 때문에 오류가 발생
