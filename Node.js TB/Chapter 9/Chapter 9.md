# Chapter 9. 익스프레스로 SNS 서비스 만들기

## 9.1 프로젝트 구조 갖추기

서버 코드를 수정하면 nodemon이 서버를 자동으로 재시작 해줍니다.
nodemon이 실행되는 콘솔에 rs를 입력해서 수동으로 재시작할 수도 있습니다.

키를 하드코딩하면 소스 코드가 유출되었을 때 키도 같이 유출되므로 별도로 관리해야 합니다.
이를 위한 패키지가 dotenv입니다.
비밀키는 .env라는 파일에 모아두고, dotenv가 .env 파일을 읽어 process.env 객체에 넣습니다.

.env 파일에 키=값 형식으로 비밀키를 추가합니다.

서버 시작 시 .env의 비밀키들을 process.env에 넣으므로 이후로 process.env.COOKIE_SECRET처럼 키를 사용할 수 있습니다.

하드코딩된 비밀번호가 유일하게 남아 있는 파일이 있습니다.
시퀄라이즈 설정을 담아둔 config.json입니다.
JSON 파일이라 process.env를 사용할 수 없습니다.

/profile, /join, /까지 페이지 세 개로 구성되어 있습니다.

main.pug에서는 user 변수가 존재할 때 게시글 업로드 폼을 보여줍니다.

profile.pug는 사용자의 팔로워와 팔로잉 중인 목록을 보여줍니다.

join.pug는 회원가입하는 폼을 보여줍니다.

error.pug는 서버에 에러 발생 시 에러 내역을 보여줍니다.

## 9.2 데이터베이스 세팅하기

로그인 기능이 있으므로 사용자 테이블이 필요하고, 게시글을 저장할 게시글 테이블도 필요합니다.
해시태그를 사용하므로 해시태그 테이블도 만들어야 합니다.

이메일, 닉네임, 비밀번호를 저장하고, SNS 로그인을 하엿을 경우에는 provider와 snsId를 저장합니다.
provider가 local이면 로컬 로그인을 한 것이고, kakao면 카카오 로그인을 한 것입니다.

게시글 모델은 게시글 내용과 이미지 경로를 저장합니다.

해시태그 모델은 태그 이름을 저장합니다.

같은 테이블 간 N:M 관계에서는 모델 이름과 컬럼 이름을 따로 정해주어야 합니다.

as 옵션은 시퀄라이즈가 JOIN 작업 시 사용하는 이름입니다.

## 9.3 Passport 모듈로 로그인 구현하기

회원가입과 로그인은 직접 구현할 수도 있지만, 복잡한 작업이 많으므로 검증된 모듈을 사용하는 것이 좋습니다.
바로 Passport를 사용하는 것입니다.

요즘에는 서비스에 로그인을 할 때 아이디와 비밀번호를 입력해서 하지 않고 기존의 SNS 서비스 계정으로 로그인하기도 합니다.
이 또한 Passport를 사용해서 해결할 수 있습니다.

폴더 내의 index.js 파일은 require 시 이름을 생략할 수 있습니다.

passport.initialize() 미들웨어는 요청(req 객체)에 passport 설정을 심고, passport.session() 미들웨어는 req.session 객체에 passport 정보를 저장합니다.
req.session 객체는 express-session에서 생성하는 것이므로 passport 미들웨어는 express-session 미들웨어보다 뒤에 연결해야 합니다.

serializeUser는 req.session 객체에 어떤 데이터를 저장할지 선택합니다.
매개변수로 user를 받아, done 함수에 두 번째 인자로 user.id를 넘기고 있습니다.
done 함수의 첫 번째 인자는 에러 발생 시 사용하는 것이므로 두 번째 인자가 중요합니다.

deserializeUser는 매 요청 시 실행됩니다.
passport.session() 미들웨어가 이 메서드를 호출합니다.
serializeUser에서 세션에 저장했던 아이디를 받아 데이터베이스에서 사용자 정보를 조회합니다.
조회한 정보를 req.user에 저장하므로 앞으로 req.user를 통해 로그인한 사용자의 정보를 가져올 수 잇습니다.

serializeUser는 사용자 정보 객체를 세션에 아이디로 저장하는 것이고, deserializeUser는 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러오는 것입니다.

localStrategy와 kakaoStrategy 파일은 각각 로컬 로그인과 카카오 로그인 전략에 대한 파일입니다.
Passport는 로그인 시의 동작을 전략이라는 용어로 표현하고 있습니다.

### 9.3.1 로컬 로그인 궇녀하기

로컬 로그인이란 다른 SNS 서비스를 통해 로그인하지 않고, 자체적으로 회원가입 후 로그인하는 것을 의미합니다.
Passport에서 이를 구현하려면 passport-local 모듈이 필요합니다.

로그인한 사용자는 회원가입과 로그인 라우터에 접근하면 안 됩니다.
마찬가지로 로그인하지 않은 사용자는 로그아웃 라우터에 접근하면 안됩니다.
따라서 라우터에 접근 권한을 제어하는 미들웨어가 필요합니다.
미들웨어를 만들며 Passport가 req 객체에 추가해주는 isAuthenticated 메서드를 알아봅시다.

Passport는 req 객체에 isAuthenticated 메서드를 추가합니다.
로그인 중이면 req.isAuthenticated()가 true고, 아니면 false 입니다.

사용자 데이터베이스에서 일치하는 이메일이 있는지 찾은 후, 있다면 bcrypt의 compare 함수로 비밀번호를 비교합니다.
비밀번호까지 일치했다면 done 함수의 두 번째 인자로 사용자 정보를 넣어 보냅니다.
두 번째 인자를 사용하지 않는 경우는 로그인에 실패했을 때뿐입니다.
done 함수의 첫 번째 인자를 사용하는 경우는 서버쪽에서 에러가 발생하였을 때고, 세 번째 인자를 사용하는 경우는 로그인 처리 과정에서 비밀번호가 일치하지 않거나 존재하지 않는 회원일 때와 같은 사용자 정의 에러가 발생하였을때입니다.

done이 호출된 후에는 다시 passport.authenticate의 콜백 함수에서 나머지 로직이 실행됩니다.

### 9.3.2 카카오 로그인 구현하기

카카오 로그인이란 로그인 인증 과정을 카카오에 맡기는 것을 뜻합니다.

이러한 SNS 로그인의 특징은 회원가입 절차가 따로 없습니다.
처음 로그인할 때는 회원가입 처리를 해주어야 하고, 두 번째 로그인부터는 로그인 처리를 해주어야 합니다.

회원가입을 따로 짤 필요가 없고, 카카오 로그인 전략이 대부분의 로직을 처리하므로 라우터가 상대적으로 간단합니다.

Get /auth/kakao로 접근하면 카카오 로그인 과정이 시작됩니다.
Get /auto/kakao에서 카카오 로그인 창으로 리다이렉트를 하고, 결과를 GET /auth/kakao/callback으로 받습니다.
로컬 로그인과 다른 점은 passport.authenticate 메서드에 콜백 함수를 제공하지 않는다는 점입니다.
카카오 로그인은 내부적으로 req.login을 호출하므로 우리가 직접 호출할 필요가 없습니다.
콜백 함수 대신에 로그인에 실패했을 때 어디로 이동할지를 객체 안 failureRedirect 속성에 적어주고, 성공 시에도 어디로 이동할지를 다음 미들웨어에 적어줍니다.

kakaoStrategy.js의 clientId 부분을 발급받아야 합니다.

## 9.4 Multer 모듈로 이미지 업로드 구현하기

SNS 서비스인 만큼 이미지 업로드도 중요합니다.
이미지는 보통 input[type=file] 태그와 form 태그를 통해서 업로드합니다.
이때 form의 인코딩 타입은 multipart/form-data인 경우가 많습니다.
이런 형식으로 올라온 데이터는 직접 처리하기 힘드므로 multipart 처리용 모듈을 사용하는 것이 좋습니다.
대표적인 것이 Multer입니다.

이미지를 어떻게 저장할 것인지는 서비스의 특성에 따라 달라집니다.

먼저 데이터베이스에서 게시글을 조회한 뒤 결과를 twits에 넣어 렌더링합니다.

## 9.5 프로젝트 마무리하기

쿼리스트링으로 해시태그 이름을 받고 해시태그가 빈 문자열인 경우 메인페이지로 돌려보냅니다.
데이터베이스에서 해당 해시태그가 존재하는지 검색한 후, 있다면 시퀄라이즈에서 제공하는 getPosts 메서드로 모든 게시글을 가져옵니다.

팔로우할 사용자는 데이터베이스에서 조회한 후, 시퀄라이즈에서 추가한 addFollowing 메서드로 현재 로그인한 사용자와의 관계를 지정합니다.

세션에 저장된 아이디로 사용자 정보를 조회할 때 팔로잉 목록과 팔로워 목록도 같이 조회합니다.