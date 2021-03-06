# 2021-01-21

## 동기 vs 비동기

### 동기

Synchronous - 동시에 일어나는

동기 방식은 서버에서 요청을 보냈을 때 응답이 돌아와야 다음 동작 수행 가능

즉, A 작업이 모두 진행될 때까지 B 작업은 대기해야 함

### 비동기

Asynchronous - 동시에 일어나지 않는

비동기 방식은 요청을 보냈을 때 응답 상태와 상관없이 다음 동작 수행 가능

즉, A 작업이 시작하면 동시에 B작업이 실행됨  
A 작업은 결괏값이 나오는 대로 출력됨

### 장단점

동기 방식은 설계가 매우 간단하고 직관적이나 결과가 주어질 때까지 대기해야 한다는 단점이 있음  
반면, 비동기 방식은 동기보다 복잡하지만 결과가 주어지는 데 시간이 걸리더라도 그 시간동안 다른 작업을 할 수 있으므로 자원을 효율적으로 사용 가능

### 참고

- https://private.tistory.com/24
- https://velog.io/@daybreak/%EB%8F%99%EA%B8%B0-%EB%B9%84%EB%8F%99%EA%B8%B0-%EC%B2%98%EB%A6%AC
