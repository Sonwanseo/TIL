# 2021-01-17

## HTTP 프로토콜의 특징

- 비연결지향: 클라이언트가 서버에서 요청을 보내고 서버가 클라이언트에게 응답을 보내면 접속을 종료
- 무상태: 통신이 끝나면 상태 정보를 유지하지 않음

즉, 클라이언트의 로그인 정보와 같은 데이터들이 페이지를 이동할 때마다 초기화됨  
이 때, 클라이언트의 데이터를 저장할 수 있는 저장공간이 Web Storage(Local Storage, Session Storage)와 Cookie

## Web Storage

### Local Storage

Local Storage는 브라우저에 반영구적으로 데이터를 저장하며, 브라우저 종료 시에도 데이터가 유지됨  
But, 도메인이 다른 경우에는 로컬 스토리지에 접근 불가

### Session Storage

Session Storage는 각 Session마다 데이터가 개별적으로 저장됨  
EX) 브라우저에서 여러 개의 탭을 실행하면 탭마다 개별적으로 데이터가 저장됨  
Session Storage는 Session을 종료하면 데이터가 자동으로 제거됨  
같은 도메인이라도 Session이 다르면 접근 불가

## Cookie

Cookie는 클라이언트 Local에 저장되는 키와 값 형태의 작은 파일로 이름, 값, 만료 시간, 경로 정보가 내포되어 있음  
브라우저는 그 데이터 조각들을 저장해 두었다가, 동일한 서버에 재 요청 시 저장된 데이터를 함께 전송  
쿠키는 두 요청이 동일한 브라우저에서 들어왔는지 아닌지를 판단할 때 주로 사용  
이를 이용하여 사용자의 로그인 상태 유지 가능

쿠키의 목적

- Session 관리: 서버에 저장해야 할 로그인, 장바구니, 게임 스코어 등의 정보 관리
- 사용자 맞춤: 사용자가 선호하는 옵션이나 테마 등의 세팅
- 사용자 추적: 사용자의 행동을 기록하고 분석하는 용도

### 참고

- https://velog.io/@hellozin/%EC%BF%A0%ED%82%A4-%EC%84%B8%EC%85%98-%EA%B7%B8%EB%A6%AC%EA%B3%A0-%EC%9B%B9-%EC%8A%A4%ED%86%A0%EB%A6%AC%EC%A7%80
- https://untitledtblog.tistory.com/47
- https://developer.mozilla.org/ko/docs/Web/HTTP/Cookies
