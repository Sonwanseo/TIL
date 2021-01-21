# 2021-01-21

## CORS

교차 출처 리소스 공유(Cross-Origin Resource Sharing)  
추가 HTTP 헤더를 사용하여, 한 출처에서 실행 중인 웹 애플리케이션이 다른 출처의 선택한 자원에 접근할 수 있는 권한을 부여하도록 브라우저에 알려주는 체제  
도메인 또는 포트가 다른 서버의 자원을 요처앟는 매커니즘

But, 동일 출처 정책(Same-Origin Policy) 때문에 CORS 같은 상황이 발생하면 외부서버에 요청한 데이터를 브라우저에서 보안 목적으로 차단  
이를 허용하기 위해 교차 출처 HTTP 요청을 실행

### 해결방법

1. Access-Control-Allow-Origin response 헤더를 추가  
   하지만 모든 응답에 일일이 추가하기 힘듦
2. node.js의 미들웨어 CORS 추가
   node.js 미들웨어 중 이를 해결해주는 CORS라는 미들웨어가 존재  
   But, 이렇게 되면 모든 요청에 대해 허가를 하게 될 수 있으니 CORS 미들웨어의 설정을 변경해야 함

### 참고

- https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
- https://velog.io/@wlsdud2194/cors
