# Chapter 20. 노드

노드는 원래 웹 애플리케이션 개발을 목적으로 만들어졌지만, 서버에서 쓰이게 되면서 데스크톱 애플리케이션 개발이나 시스템 스크립트 같은 영역으로도 확장됐다.

### 20.1 노드의 기초

자바스크립트로 프로그램을 만들 수 있으면 노드 애플리케이션도 만들 수 있다.
노드에는 DOM이 없다.

무엇이 자바스크립트이고 무엇이 API의 일부인지 구분할 수 있어야 한다.

### 20.2 모듈

모듈은 패키지를 만들고 코드를 네임스페이스로 구분하는 메커니즘이다.
네임스페이스는 이름 충돌을 방지하는 방법이다.

모듈은 어떤 타입의 값이든 내보낼 수 잇다.
보통은 모듈 하나에 여러 함수를 저장하고, 그 함수를 메서드로 포함하는 객체를 내보내는 것이 일반적이다.

exports를 사용한 단축 문법은 객체를 내보낼 때만 쓸 수 있다.
두 문법을 섞어 쓸 수도 없다.

### 20.3 코어 모듈, 파일 모듈, npm 모듈

모듈은 코어 모듈, 파일 모듈, npm 모듈 세 가지로 나뉜다.
코어 모듈은 fs나 os처럼 노드 자체에서 제공하는 모듈이며, 이들은 모두 예약어이다.
npm 모듈은 특별한 디렉터리 node_modules에 저장되는 모듈 파일이다.
require 함수를 사용하면 노드는 함수의 매개변수를 보고 어떤 타입인지 판단한다.

process와 buffer 같은 일부 코어 모듈은 전역이고 명시적인 require 문 없이 사요앟ㄹ 수 있다.

npm 모듈은 특수한 이름 표기법을 사용하는 파일 모듈이다.
모듈 x를 가져올 때, x가 코어 모듈 이름이 아니라면 노드는 먼저 현재 디렉터리에 node_modules 서브 디렉터리가 있는지 확인한다.
node_modules 서브디렉터리가 있으면 그 안에서 x를 찾는다.
찾지 못하면 부모 디렉터리로 올라가서 node_modules 서브디렉터리가 있는지, 있다면 모듈 x가 있는지 확인한다.
모듈을 찾거나 루트 디렉터리에 도달할 때까지 이 과정을 반복한다.

파일 관련 작업은 모두 npm에서 하도록 해야 한다.

직접 작성하는 모듈을 node_modules에 저장해서는 안된다.

### 20.4 함수 모듈을 통한 모듈 커스터마이징

모듈은 대부분 객체를 내보내지만, 이따금 함수 하나만 내보낼 때도 잇다.
함수 하나만 내보내는 경우는 그 모듈의 함수를 즉시 호출하려는 의도로 만들 때가 대부분이다.
이런 패턴은 모듈을 일부 커스터마이즈 하거나, 주변 컨텍스트에서 정보를 얻어야 할 때 주로 사용한다.

노드는 노드 앱을 실행할 때 어떤 모듈이든 단 한 번만 임포트한다.

### 20.5 파일 시스템 접근

write.js 파일을 저장한 디렉터리에 쓰기 권한이 있고, 읽기 전용 hello.txt 파일이 이미 존재하지 않으면 hello.txt 파일이 생성될 것이다.
노드 애플리케이션을 실행하면 해당 애플리케이션은 자신이 실행된 현재 작업 디렉터리를 \_\_dirname 변수로 보관한다.

문자열 병합으로 \_\_dirname과 파일 이름을 합쳐서 파일 경로를 얻으면 운영체제에 따라 호환되지 않을 수 있다.
노드의 path 모듈에는 운영체제 독립적인 경로 이름 유틸리티가 있다.

path.join은 운영체제에 따라 디렉터리 구분자를 알맞게 사용한다.

파일 콘텐츠를 읽을 때는 fs.readFile을 사용한다.

fs.readFile에 인코딩 정보를 제공하지 않으면 fs.readFile은 가공되지 않은 바이너리 데이터인 버퍼를 반환한다.

파일 관련 함수에는 모두 동기적으로 작업하는 짝이 있으며, 이들의 이름은 Sync으로 끝난다.

동기적인 함수에서는 try/catch 블록을 통해 예외 처리를 한다.

디렉터리에 어떤 파일이 있는지 알아보려면 fs.readdir을 사용한다.

파일을 지울 때는 fs.unlink
파일을 옮기거나 이름을 바꿀 때는 fs.rename
파일과 디렉터리 정보를 얻을 때는 fs.stat

### 20.6 process

실행 중인 노드 프로그램은 모두 process 변수에 접근할 수 있다.
이 변수는 해당 프로그램에 관한 정보를 담고 있으며 실행 자체를 컨트롤할 수도 있다.

숫자형 종료 코드를 쓰면 프로그램이 성공적으로 종료됐는지 에러가 있었는지 외부 스크립트에서도 알 수 있다.

process 객체를 통해 프로그램에 전달된 명령줄 매개변수 배열에 접근할 수도 있다.
노드 애플리케이션을 실행할 때 명령줄에서 매개변수를 지정할 수 있다.

명령줄 매개변수는 process.argv 배열에 저장된다.

첫 번재 요소는 인터프리터, 즉 소스 파일을 해석한 프로그램이다.
두 번째 요소는 실행 중인 프로그램의 전체 경로이며, 나머지 요소는 프로그램에 전달된 매개변수이다.

process.env를 통해 환경 변수에 접근할 수도 있다.
환경 변수는 시스템 변수이며 주로 명령줄 프로그램에서 사용한다.

환경 변수를 활용하면 프로그램을 실행할 때마다 명령줄에서 매개변수로 지정할 필요가 없다.

현재 작업 디렉터리의 기본값은 프로그램을 실행한 디렉터리이다.
process.cwd에는 현재 작업 디렉터리가 저장되며, process.chdir로 현재 작업 디렉터리를 바꿀 수 있다.

### 20.7 운영체제

os 모듈은 프로그램을 실행하는 컴퓨터의 운영체제에 관한 정보를 제공한다.

### 20.8 자식 프로세스

child_process 모듈은 애플리케이션에서 다른 프로그램을 실행할 때 사용한다.
실행할 프로그램은 다른 노드 프로그램, 실행 파일, 다른 언어로 만든 스크립트여도 상관없다.

child_process 모듈에서 제공하는 주요 함수는 exec, execFile, fork이다.
fs와 마찬가지로 이들 함수에는 동기적 버전 execSync, execFileSync, forkSync가 있다.
exec는 운영체제의 명령줄이나 다름없는 셸을 호출한다.
execFile은 셸을 통하지 않고 실행 파일을 직접 실행하므로 메모리와 자원 관리 면에서 좀 더 효율적이지만, 그만큼 더 주의해야 할 점이 있다.
마지막으로 fork는 다른 노드 스크립트를 실행할 때 사용한다.

fork는 별도의 노드 엔진을 호출하므로 소모하는 자원 면에서는 exec와 마찬가지이다.

exec는 셸을 호출하므로 dir 실행 파일이 존재하는 경로를 따로 지정할 필요는 없다.

호출되는 콜백은 Buffer 객체 두 개를 받는다.

exec는 옵션 매개변수로 options 객체를 받을 수 있다.

### 20.9 스트림

스트림은 스트림 형태의 데이터를 다루는 객체이다.
스트림이란 단어는 흐름이란 느낌이 있다.

스트림에는 읽기 스트림, 쓰기 스트림, 이중 스트림이 있다.

end를 호출해서 쓰기 스트림(ws)를 종료하기 전까지는 write 메서드를 통해 스트림에 쓸 수 있다.
end를 호출한 다음 다시 write를 호출하면 에러가 발생한다.

### 20.10 웹 서버

http 모듈에는 기본적인 웹 서버를 만드는 createServer 메서드가 있다.
서버를 시작할 때는 listen 메서드를 호출하면서 포트를 지정한다.

노드 웹 서버의 핵심은 들어오는 요청에 모두 응답하는 콜백 함수이다.
이 함수는 매개변수로 IncomingMessage 객체(보통 req)와 ServerRequest 객체(보통 res)를 받는다.
IncomingMessage 객체에는 요청받은 URL, 보낸 헤더, 바디에 들어있던 데이터 등 HTTP 요청에 관한 모든 정보가 들어 있다.
ServerResponse 객체에는 클라이언트(보통 브라우저)에 보낼 응답을 컨트롤하는 프로퍼티와 메서드가 들어 있다.