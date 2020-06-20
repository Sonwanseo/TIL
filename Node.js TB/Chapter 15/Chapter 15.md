# Chapter 15. AWS와 GCP로 배포하기

## 15.1 서비스 운영을 위한 패키지

### 15.1.1 morgan과 express-session

process.env.NODE_ENV는 배포 환경인지 개발 환경인지를 판단할 수 있는 환경 변수입니다.
배포 환경일 때는 morgan을 combined 모드로 사용하고, 개발 환경일 때는 dev 모드로 사용합니다.
combined 모드는 dev 모드에 비해 더 많은 사용자 정보를 로그로 남깁니다.

참고로 proceess.env.NODE_ENV는 .env에 넣을 수 없습니다.
개발 환경인지 배포 환경인지에 따라 값이 변해야 하는데, .env 파일은 정적 파일이기 때문입니다.

express-session은 배포 환경일 때는 proxy를 true로, cookie-secure를 true로 바꿉니다.
proxy를 tru로 적용해야 하는 경우는 https 적용을 위해 노드 서버 앞에 다른 서버를 두었을 때입니다.
cookie.secure 또한 https 적용이나 로드밸런싱(요청 부하 분산) 등을 위해 true로 바꿔줍니다.

### 15.1.2 sequelize

시퀄라이즈에서 가장 큰 문제는 비밀번호가 하드코딩되어 있다는 것입니다.
JSON 파일이므로 변수를 사용할 수 없습니다.
다행히 시퀄라이즈는 JSON 대신 JS 파일을 설정 파일로 쓸 수 있게 지원합니다.

JS 파일이므로 dotenv 모듈을 사용할 수 있습니다.
root 계정은 숨기는 게 좋습니다.

process.env가 development일 때는 development 속성의 설정 내용이 적용되고, production일 때는 production 속성의 설정 내용이 적용됩니다.

배포 환경에서는 어떤 쿼리가 수행되는지 숨기는 것이 좋습니다.
따라서 production일 경우에는 logging에 false를 주어 쿼리 명령어를 숨겼습니다.

데이터베이스 비밀번호는 .env 파일에 입력합니다.

### 15.1.3 cross-env

cross-env 패키지를 사용하면 동적으로 process.env를 변경할 수 있습니다.

npm 스크립트를 두 개로 나누었습니다.
npm start는 배포 환경에서 사용하는 스크립트고, npm run dev는 개발 환경에서 사용하는 스크립트입니다.

### 15.1.4 retire

설치된 패키지에 문제는 없는지 확인해 보아야 합니다.
이를 위해 retire라는 패키지가 있습니다.

### 15.1.5 pm2

pm2는 원활한 서버 운영을 위한 패키지입니다.
가장 큰 기능은 서버가 에러로 인해 꺼졌을 때 서버를 다시 켜주는 것입니다.

또 하나 중요한 기능은 바로 멀티 프로세싱입니다.
멀티 스레딩은 아니지만 멀티 프로세싱을 지원하여 노드 프로세스 개수를 1개 이상으로 늘릴 수 있습니다.
CPU 코어를 하나만 사용하여 다른 코어들이 노는 일을 방지할 수 있습니다.
노드는 클라이언트로부터 요청이 왔을 때 요청을 여러 노드 프로세스에 고르게 분배합니다.
하나의 프로세스가 받는 부하가 적어지므로 서비스를 더 원활하게 운영할 수 있습니다.

멀티 스레딩이 아니므로 서버의 메모리 같은 자원을 공유하지는 못합니다.
지금까지 세션을 메모리에 저장했는데, 메모리를 공유하지 못해서 프로세스 간에 세션이 공유되지 않는 것입니다.

이 문제를 극복하기 위해서는 세션을 공유할 수 잇게 해주는 무언가가 필요합니다.
이를 위해서 주로 Memcached나 레디스 같은 서비스를 사용합니다.

pm2를 실행했더니 다른 점이 있습니다.
node나 nodemon 명령어와는 다르게 노드 프로세스가 실행되면서 콘솔에 다른 명령어를 입력할 수 있습니다.
pm2가 노드 프로세스를 백그라운드로 돌리기 때문에 가능합니다.

백그라운드에서 돌고 있는 노드 프로세스를 확인할 방법이 필요한데, pm2 list 명령어를 사용하면 됩니다.

pm2 start를 실행했을 때처럼 현재 프로세스 정보가 표시됩니다.
CPU와 메모리 사용량 등이 보여 편리합니다.

pm2 프로세스를 종료하고 싶다면 콘솔에 pm2 kill을 입력하면 됩니다.
서버를 재시작하고 시다면 pm2 reload all을 입력합니다.
다운타임(서버가 중지되어 클라이언트가 접속할 수 없는 시간)이 거의 없어 서버가 재시작되어 좋습니다.

노드의 cluster 모듈처럼 클러스터링을 가능하게 하는 pm2의 클러스터링 모드를 사용해봅시다.

pm2 start app.js 대신에 pm2 start app.js -i 0 명령어를 사용합니다.
-i 뒤에 생성하길 원하는 프로세스 개수를 기입하면 됩니다.
0은 현재 CPU 코어 개수만큼 프로세스를 생성한다는 뜻이고, -1은 프로세스를 CPU 코어 개수보다 한 개 덜 생성하겠다는 뜻입니다.
남은 코어 하나는 노드 외의 다른 작업을 할 수 있게 하기 위해서입니다.

현재 프로세스를 모니터링할 수도 있습니다.
pm2 monit으로 가능합니다.

### 15.1.6 winston

실제 서버 운영 시 console.log와 console.error를 대체하기 위한 모듈입니다.

console.log와 console.error를 사용하면 개발 중에는 편리하게 서버의 상황을 파악할 수 있지만, 실제 배포 시에는 사용하기 어렵습니다.
console 객체의 메서드들이 언제 호출되었는지 파악하기 힘들 뿐만 아니라 서버가 종료되는 순간 로그들도 사라져 버리기 때문입니다.
에러가 발생하면 에러 메시지를 확인해야 하는데, 서버가 종료되어서 에러 메시지들이 날아가 버리는 황당한 일이 일어나게 됩니다.
이와 같은 상황을 방지하려면 로그를 파일이나 다른 데이터베이스에 저장해야 합니다.
이때 winston을 사용합니다.

winston 패키지의 createLogger 메서드로 logger를 만듭니다.
인자로 logger에 대한 설정을 넣어줄 수 있습니다.
설정으로는 level, format, transports 등이 있습니다.

- level은 로그의 심각도를 의미합니다. error, warn, info, verbose, debug, silly가 있습니다.
  심각도순(error가 가장 심각)이므로 위 순서를 참고하여 기록하길 원하는 유형의 로그를 고르면 됩니다.
  info를 고른 경우, info보다 심각한 단계의 로그(error, warn)도 함게 기록됩니다.
- format은 로그의 형식입니다.
  json, label, timestamp, print, simple, combine 등의 다양한 형식이 있습니다.
  기본적으로는 JSON 형식으로 기록하지만 로그 기록 시간을 표시하려면 timestamp를 쓰는 것이 좋습니다.
  combine은 여러 형식을 혼합해서 사용할 때 씁니다.
- transports는 로그 저장 방식을 의미합니다.
  new transport.File은 파일로 저장한다는 뜻이고, new transports.Console은 콘솔에 출력한다는 뜻입니다.
  여러 로깅 방식을 동시에 사용할 수도 있습니다.
  배포 환경이 아닌 경우 파일뿐만 아니라 콘솔에도 출력하도록 되어있습니다.
  이 메서드들에도 level, format 등을 설정할 수 있습니다.
  new transports.File인 경우 로그 파일의 이름인 filename도 설정할 수 있습니다.

winston-daily-rotate-file은 로그를 날짜별로 관리할 수 있게 해주는 패키지라 알아두면 좋습니다.

### 15.1.7 helmet, hpp

helmet과 hpp는 서버의 각종 취약점을 보완해주는 패키지들입니다.
익스프레스 미들웨어로서 사용할 수 있습니다.
이 패키지를 사용한다고 해서 모든 취약점을 방어해주는 것은 아니므로 서버를 운영할 때는 주기적으로 취약점을 점검해야 합니다.

### 15.1.8 connet-redis

멅리 프로세스 간 세션 공유를 위해 레디스와 익스프레스를 연결해주는 패키지입니다.

connet-redis 패키지로부터 RedisStore 객체를 require합니다.
connet-redis는 express-session에 의존성이 있습니다.

RedisStore의 옵션으로 .env에 저장했던 값들을 사용합니다.
host, port, pass를 차례대로 넣어주면 됩니다.
logErrors 옵션은 레디스에 에러가 났을 때 콘솔에 표시할지를 결정하는 옵션입니다.

### 15.1.9 nvm, n

노드 버전을 업데이트하기 위한 패키지입니다.

#### 15.1.9.1 윈도

새로운 버전을 설치하고 싶다면 nvm install [버전]을 입력합니다.

설치된 버전을 사용하려면 nvm use [버전명]을 입력합니다.

#### 15.1.9.2 맥, 리눅스

맥과 리눅스에서는 n 패키지를 사용하면 편리합니다.

새로운 버전을 설치하고 싶다면 n 버전을 입력합니다.

## 15.2 Git과 GitHub 사용하기

배포를 위해 필요한 패키지를 설치했으니 이제 소스 코드를 업로드할 차례입니다.
AWS와 GCP에 업로드하려고 하는데요.
각 클라우드의 서버로 직접 파일과 폴더를 업로드할 수도 있지만, 실무에서는 대부분 그렇게 하지 않습니다.

Git이라는 분산형 버전 관리 시스템을 많이 사용합니다.
실무에서 협업, 코드 롤백, 배포 자동화 등 다양한 곳에서 사용합니다.
Git은 따로 배워둘 가치가 있습니다.

GitHub는 Git으로부터 업로드한 소스 코드를 서버에 저장할 수 있는 원격 저장소입니다.
Git은 하나의 컴퓨터에서 코드를 관리하는 데 사용하지만, GitHub에 소스 코드를 업로드하면 여러 사람이 코드를 공동 관리할 수 있습니다.

### 15.2.1 Git 설치하기

git --version
Git의 버전을 확인하는 명령어입니다.

### 15.2.2 GitHub 사용하기

git init 명령어는 현재 디렉터리를 Git 관리 대상으로 지정하는 명령어입니다.

모든 파일과 디렉터리를 Git 관리 대상에 추가하는 명령어입니다.

git add .
git add 뒤의 .(점)은 모든 파일을 추가하겠다는 의미입니다.

변경사항을 확정하는 명령어
git config
git commit -m
-m 뒤의 문자열은 확정에 관한 설명 메시지입니다.

Git에 GitHub 주소를 등록해야 합니다.
git remote add [별명][주소] 명령어를 사용합니다.

GitHub에 업로드를 해봅시다.
git push [별명][브랜치] 명령어를 사용하면 됩니다.

## 15.3 AWS 시작하기

## 15.4 AWS에 배포하기

## 15.5 GCP 시작하기

## 15.6 GCP에 배포하기