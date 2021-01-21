# 2021-01-21

## 블로킹 vs 논블로킹

### 블로킹

블로킹(Blocking I/O)

호출된 함수가 자신의 작업을 모두 끝낼때까지 제어권을 가지고 있어 호출한 함수가 대기하도록 만듦

### 논블로킹

논블로킹(NonBlocking I/O)

호출된 함수가 바로 return해서 호출한 함수에게 제어권을 주어 다른 일을 할 수 있게 함

### 블로킹/논블로킹과 동기/비동기의 관계

동기/비동기처리는 호출하는 함수가 어느 방식으로 다른 함수를 호출하는가와 관련된 것  
블로킹/논블로킹은 호출되는 함수가 호출하는 함수에게 언제 제어권을 넘겨주는가와 관련된 것

### 참고

- https://siyoon210.tistory.com/147
- https://heecheolman.tistory.com/48
- http://homoefficio.github.io/2017/02/19/Blocking-NonBlocking-Synchronous-Asynchronous/
