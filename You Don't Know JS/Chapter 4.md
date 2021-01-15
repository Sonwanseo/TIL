# Chapter 4. 클래스와 객체의 혼합

## 4.1 클래스 이론

클래스와 상속은 특정 형태의 코드와 구조를 형성하며 실생활 영역의 문제를 소프트웨어로 모델링 하기 위한 방법

객체 지향 또는 클래스 지향 프로그래밍에서 데이터는 자신을 기반으로 하는 실행되는 작동과 연관되므로 데이터와 작동을 함게 잘 감싸는 것이 올바른 설계라고 강조함
정규 컴퓨터 과학에서는 이를 자료 구조라고 표현

클래스는 특정 자료 구조를 분류하는 용도로 사용
즉, 일반적인 기준 정의에서 세부적이고 구체적인 변형으로서의 자료 구조를 도출하는 것

다형성은 또 다른 클래스의 핵심 개념으로 부모 클래스에 뭉뚱그려 정의된 작동을 자식 클래스에서 좀 더 구체화하여 오버라이드하는 것을 뜻함
사실 오버라이드된 작동에서 기반 작동을 참조할 수 있는 것은 이런 상대적 다형성 덕분

클래스 이론에서는 어떤 작동이 담긴 메서드의 이름을 부모와 자식 클래스 모두 똑같이 공유하여 자식 클래스 메서드가 부모 클래스 메서드를 오버라이드하라고 권장함
But, 자바스크립트에서 이렇게 하면 예기치 못한 결과를 초래하기도 함

### 4.1.1 클래스 디자인 패턴

순회자, 관찰자, 팩토리, 싱글턴 등의 유명한 객체 지향 디자인 패턴들이 워낙 자주 인용되는 탓에 클래스 역시 디자인 패턴의 일종이란 생각은 한 번도 해본 적이 없을 것임

절차적 프로그래밍이란 상위 수준의 추상화 없이 다른 함수를 호출하는 프로시저로만 코드를 구성하는 프로그래밍 기법

함수형 프로그래밍을 경험해 봤다면 클래스가 단지 많이 쓰는 서너 개 디자인 패턴 중 하나라는 사실 또한 잘 알고 있을 것임
하지만 대부분 독자에게 클래스가 과연 모든 코드의 근본적인 기초일까 아니면 코드를 선택적으로 추상화한 것일까란 의문을 품는 자체가 어색하게 느껴질 것임

몇몇 언어는 선택의 여지가 없어 만물이 다 클래스
C/C++나 PHP 같은 언어는 절차적 구문과 클래스 지향 구문을 함께 제공하므로 개발자가 스타일을 선택할 수 있음

### 4.1.2 자바스크립트 클래스

꽤 오래전부터 클래스와 비슷하게 생긴 구문 요소도 갖추고 있고 최근 ES6부터는 아예 class라는 키워드가 명세에 정식으로 추가됨
하지만 자바스크립트에는 클래스 존재 X

클래스는 디자인 패턴이므로 클래스 기능과 얼추 비슷하게 구현하는 것은 가능
자바스크립트도 계속해서 클래스 디자인 패턴을 실현하려는 노력이 있었음

But, 클래스처럼 보이는 구문일 뿐이며 개발자들이 클래스 디자인 패턴으로 코딩할 수 있도록 자바스크립트 체계를 억지로 고친 것에 불과
전혀 다른 방식으로 작동함

클래스는 소프트웨어 디자인 패턴 중 한 가지 옵션일 뿐이므로 자바스크립트에서 클래스를 쓸지 말지는 결국 자신이 결정할 문제


## 4.2 클래스 체계

대부분 클래스 지향 언어의 '표준 라이브러리'는 '스택' 자료 구조를 Stack 클래에 구현해놓음
Stack 클래스 내부에는 데이터를 저장하는 변수 세트가 있고 다른 코드에서 데이터와 상호 작용할 수 있도록 외부에서 접근 가능한 작동 모음을 제공

But, Stack 클래스에서 실제로 어떤 작업을 직접 수행하는 것은 아님
Stack 클래스는 모든 스택이라면 마땅히 해야 할 기능을 추상화한 것일 뿐 그 자체가 스택은 아님
stack 클래스를 인스턴스화해야 비로소 작업을 수행할 구체적인 자료 구조가 마련됨

### 4.2.1 건축

클래스는 건축에서 청사진에 해당
개발자가 상호 작용할 실제 객체는 클래스라는 붕어빵 틀에서 구워냄
이 '구워냄'의 최종 결과가 인스턴스라는 객체고 개발자는 객체 메서드를 직접 호출하거나 공용 데이터 프로퍼티에 접근
객체는 클래스에 기술된 모든 특성을 그대로 가진 사본

객체 인스턴스를 통해 클래스에 직접 접근하여 어떤 조작을 가할 일은 거의 없지만 적어도 어느 클래스로부터 구워진 객체 인스턴스인지 그 출처를 식별하는 일은 어렵지 않음

객체 인스턴스와 출처(클래스) 간의 간접적인 관계보다 클래스와 객체 인스턴스의 직접적인 관계를 따져보는 게 좀 더 유용함
클래스는 복사 과정을 거쳐 객체 형태로 인스턴스화

### 4.2.2 생성자

인스턴스는 보통 클래스명과 같은 이름의 생성자라는 특별한 메서드로 생성
생성자의 임무는 인스턴스에 필요한 정보 초기화

```javascript
class CoolGuy {
	specialTrick = nothing;
	
	CoolGuy(trick) {
		specialTrick = trick;
	}
	showOff() {
		output("이게 내 장기랍니다: ", specialTrick);
	}
}

Joe = new CoolGuy('카드 마술');
Joe.showOff(); // 이게 내 장기랍니다: 카드 마술
```

CoolGuy 클래스엔 생성자 CoolGuy()가 있어서 new CoolGuy()를 하면 실제로 이 생성자가 호출됨
생성자의 반환 값은 객체이므로 showOff() 메서드를 호출하면 CoolGuy의 장기가 뭔지 알 수 있음

생성자는 클래스에 속한 메서드로, 클래스명과 같게 명명하는 것이 일반적
그리고 새로운 클래스 인스턴스를 생성할 거라는 신호를 엔진이 인지할 수 있도록 항상 new 키워드를 앞에 붙여 생성자를 호출함

## 4.3 클래스 상속

클래스 지향 언어에서는 자체로 인스턴스화할 수 있는 클래스는 물론이고 첫 번재 클래스를 상속받은 두 번째 클래스를 정의할 수 있음
이때 첫 번째 클래스를 '부모 클래스', 두 번째 클래스를 '자식 클래스'라고 통칭

자식 클래스는 부모 클래스에서 완전히 떨어진 별개의 클래스로 정의됨
부모로부터 복사된 초기 버전의 작동을 고스란히 간직하고 있지만 물려받은 작동을 전혀 새로운 방식으로 오버라이드 가능

### 4.3.1 다형성

다형성은 '상대적'이란 관점에서 한 메서드가 상위 수준의 상속 체계에서 다른 메서드를 참조할 수 있게 해주는 아이디어
'상대적'이라고 한 이유는 접근할 상속 수준에 대한 절대적인 기준이 없는 상태에서 레퍼런스를 거슬러 올라가기 때문

대부분 언어는 inherited 대신 super라는 키워드를 사용하며, 이는 "superclass"를 현재 클래스의 부모/조상이라고 간주하는 것임

같은 이름의 메서드가 상속 연쇄의 수준별로 다르게 구현되어 있고 이 중 어떤 메서드가 적절한 호출 대상인지 자동으로 선택하는 것 또한 다형성의 특징

***자식 클래스의 생성자가 super 키워드로 직접 부모 클래스의 생성자를 참조하는 것 또한 전통적인 클래스 지향 언어에서 지원하는 기능이다. 진짜 클래스에서 생성자는 클래스의 한 부분이어서 대체로 그렇지만 자바스크립트는 정반대다. 외려 '클래스'가 생성자에 속한다고 보는 게 더 정확하다. 자바스크립트의 부모/자식 관계는 각 생성자의 .prototype 객체에만 기술되므로 막상 생성자 당사자는 직접적인 연관이 없으며 서로를 참조할 방법이 아예 없다.***

클래스를 상속하면 자식 클래스에는 자신의 부모 클래스를 가리키는 상대적 레퍼런스가 주어지는데, 바로 이 레퍼런스를 보통 super라고 함

클래스 상속은 한 마디로 '복사'

### 4.3.2 다중 상속

일부 클래스 지향 언어에서는 복수의 '부모' 클래스에서 '상속'받을 수 있음
다중 상속은 부모 클래스 각각의 정의가 자식 클래스로 복사된다는 의미

하지만, 다중 상속이 가능하다면 참조할 때 문제가 발생 가능
두 부모 클래스 모두 똑같은 이름의 메서드가 존재할 때 어느 부모 클래스의 메서드를 참조해야 하는 지가 문제

자바스크립트는 한 마디로 '다중 상속' 기능 따위는 아예 처음부터 지원하지 않았음

## 4.4. 믹스인

자바스크립트 객체는 상속받거나 인스턴스화해도 자동으로 복사 작업이 일어나지는 않음
쉽게 말하면 자바스크립트엔 인스턴스로 만들 '클래스'란 개념 자체가 없고 오직 객체만 존재
그리고 객체는 다른 객체에 복사되는 게 아니라 서로 연결됨

믹스인은 다른 언어와 달리 자바스크립트에선 누락된 클래스 복사 기능을 흉내낸 것
- 명시적 믹스인
- 암시적 믹스인

### 4.4.1 명시적 믹스인

```javascript
function mixin(sourceObj, targetObj) {
	for(var key in sourceObj) {
		if(!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}
	return targetObj;
}

var Vehicle = {
	engines: 1,
	ignition: function() {
		console.log("엔진을 켠다.");
	},
	drive: function() {
		this.ignition();
		console.log('방향을 맞추고 앞으로 간다!');
	}
}

var Car = mixin(Vehicle, {
	wheels: 4,
	drive: function() {
		Vehicle.drive.call(this);
		console.log(this.wheels + "개의 바퀴로 굴러간다!");
	}
});
```

자바스크립트 엔진은 Vehicle의 작동을 Car로 알아서 복사하지 않으므로 일일이 수동으로 복사하는 유틸리티를 대신 작성하면 됨
이런 유틸리티를 여러 자바스크립트 라이브러리와 프레임워크에서는 extend()라고 명명함

이제 Car에는 Vehicle에서 복사한 프로퍼티와 함수 사본이 존재
엄밀히 말해 함수가 실제로 복사된 것이 아니라 원본 함수를 가리키는 레퍼런스만 복사된 것

##### 다형성 재고

자바스크립트는 상대적 다형성을 제공하지 않음
따라서 drive()란 이름의 함수가 Vehicle과 Car 양쪽에 모두 있을 때 이 둘을 구별해서 호출하려면 절대적인 레퍼런스를 이용할 수 밖에 없고 그래서 명시적으로 Vehicle 객체의 이름을 지정하여 drive() 함수를 호출(Vehicle.drive.call(this) 부분)

상대적 다형성을 제공하는 클래스 지향 언어에서는 클래스가 정의되는 시점에 일단 Vehicle과 Car가 연결되면 이러한 관계를 모두 한곳에서 취합하여 관리

하지만 자바스크립트는 매우 독특한 언어라 다형적 레퍼런스가 필요한 함수마다 명시적 의사다형성(저자만의 단어) 방식의 취약한 연결을 명시적으로 일일이 만들어줘야 함

결과적으로 더 복잡하고 더 읽기 어렵고 더 관리하기 어려운 코드가 됨
명시적 의사다형성은 아무리 봐도 장점보다는 비용이 훨씬 더 많이 들기 때문에 가능한 한 쓰지 않는 게 좋음

##### 사본 혼합

```javascript
function mixin(sourceObj, targetObj) {
	for(var key in sourceObj) {
		if(!(key in targetObj)) {
			targetObj[key] = sourceObj[key];
		}
	}
	return targetObj;
}
```

mixin() 함수는 sourceObj 프로퍼티를 순회하면서 targetObj에 같은 이름의 프로퍼티 유무를 체크하여 없으면 복사함
초기 객체가 이미 존재하므로 복사 시 타깃 프로퍼티를 덮어쓰지 않게 조심해야 함

일단 복사를 다 한 뒤에 Car에 특정한 내용만 구분하면 targetObj에 이런 체크 로직은 필요하지 않겠지만, 코드가 투박해지고 비효율적이라 이렇게 쓰지 않음

복사가 끝나면 Car는 Vehicle과 별개로 동작
Car에 프로퍼티를 추가해도 Vehicle엔 아무런 영향이 없고 그 반대 역시 마찬가지

***실제로는 복사가 완료된 이후에도 공용 객체를 가리키는 레퍼런스는 둘 다 공유하므로 두 객체가 서로에게 미묘하게 영향을 줄 가능성은 존재***

공용 함수의 레퍼런스는 두 객체 모두 같이 쓰기 때문에 수동으로 객체 간에 함수를 일일이 복사하더라도 다른 클래스 지향 언어처럼 100%[클래스 -> 인스턴스]의 복사는 어려움

사실 자바스크립트 함수는 복사가 불가능
복사되는 건 같은 공유 함수 객체를 가리키는 사본 레퍼런스임
공유 함수 객체에 프로퍼티를 추가하는 등의 변경을 하면 공유 레퍼런스를 통해 Vehicle/Car 모두에게 영향을 끼침

명시적 믹스인은 자바스크립트에서 쓸만한 장치이긴 하지만 보기보다 그다지 강력하지 않음
실제로 어떤 개체에서 다른 객체로 프로퍼티를 복사하느니 차라리 그냥 무식하게 똑같은 프로퍼티를 각각 두 번씩 정의하는 편이 더 나음

복수의 객체를 타깃 객체에 명시적으로 믹스인할 경우 부분적으로는 다중 상속을 흉내 낼 수 있지만 여러 소스에서 이름이 같은 메서드나 프로퍼티가 복사되면 충돌을 피할 뾰족한 대책이 없음

명시적 믹스인은 코드 가독성에 도움이 될 때만 조심하여 사용하되 점점 코드가 추적하기 어려워지거나 불필요하고 난해한 객체 간 의존 관계가 양산될 기미가 보이면 사용을 중단해야 함

##### 기생 상속

'기생 상속'은 더글러스 크록포드가 작성한 명시적 믹스인 패턴의 변형으로 명시적/암시적 특징을 모두 갖고 있음

```javascript
function Vehicle() {
	this.engines = 1;
}
Vehicle.prototype.ignition = function() {
	console.log("엔진을 켠다.");
}
Vehicle.prototype.drive = function() {
	this.ignition();
	console.log("방향을 맞추고 앞으로 간다!");
}

function Car() {
	// 자동차는 탈것의 하나다.
	var car = new Vehicle();
	
	// 자동차에만 해당되는 내용은 수정한다.
	car.wheels = 4;
	
	// 'Vehicle::drive()'를 가리키는 내부 레퍼런스를 저장한다.
	var vehDrivie = car.drive;
	
	// 'Vehicle::drive()'를 오버라이드 한다.
	car.drive = function() {
		vehDrive.call(this);
		console.log(this.wheels + "개의 바퀴로 굴러간다!");
	}
	return car;
}

var myCar = new Car();

myCar.drive();
// 엔진을 켠다.
// 방향을 맞추고 앞으로 간다!
// 4개의 바퀴로 굴러간다!
```

초기에 부모 클래스인 Vehicle의 정의를 복사하고 자식 클래스 정의에 믹스인한 뒤 조합된 객체 car를 자식 인스턴스로 넘김

***new Car()를 호출하면 생성되는 새 객체는 Car의 this 레퍼런스로 참조할 수 있지만 이 객체는 사용하지 않고 자체 car 객체를 반환하기 때문에 처음에 생성된 개체는 간단히 무시된다. 따라서 Car()는 new 없이 호출해도 기능은 같으며 오히려 불필요한 객체 생성과 가비지 컬렉션을 줄일 수 있다.***

### 4.4.2 암시적 믹스인

암시적 믹스인은 앞서 설명한 명시적 의사다형성과 밀접한 관계가 있으므로 사용할 때 주의해야 함

```javascript
var Something = {
	cool: function() {
		this.greeting = "Hello World";
		this.count = this.count ? this.count + 1 : 1;
	}
};
Something.cool();
Something.greeting; // "Hello WOrld"
Something.count; // 1

var Another = {
	cool: function() {
		// 'Something'을 암시적으로 'Another'로 믹스인한다.
		Something.cool.call(this);
	}
};
Another.cool();
Another.greeting; // "Hello World";
Another.count; // 1('Something'과 상태가 공유되지 않는다.)
```

가장 일반적인 생성자 호출 또는 메서드 호출 시 Something.cool.call(this)를 하면 Something.cool() 함수를 본질적으로 '빌려와서' Another 콘텍스트로 호출함
결국, Something.cool()의 할당은 Something이 아닌 Another
따라서 Something의 작동을 Another와 섞은 셈

this 재바인딩을 십분 활용한 이런 유형의 테크닉은 Something.cool.call(this) 같은 호출이 상대적 레퍼런스가 되지 않아 불안정하므로 사용할 때 신중히 처리해야 함
대부분은 깔끔하고 쉬운 코드를 유지하기 위해 쓰지 않는 편이 좋음

## 4.5 정리하기

클래스는 디자인 패턴의 일종
많은 언어에서 클래스 지향 소프트웨어 디자인이 가능한 구문을 처음부터 제공하는데, 자바스크립트에도 역시 유사한 구문이 존재
그러나 자바스크립트에서 클래스의 의미는 다른 언어들과 다름

클래스는 복사를 의미
전통적인 클래스는 인스턴스화하면 [클래스 -> 인스턴스]로 복사 발생
클래스 역시 상속하면 [부모 -> 자식] 방향으로 복사됨

자바스크립트는 객체 간 사본을 자동으로 생성하지 않음
믹스인 패턴은 클래스의 복사 기능을 모방하기 위해 종종 쓰이지만 대부분 명시적 의사다형성처럼 보기 싫고 취약한 구문이 되어 가독성이 점점 더 떨어지고 유지 보수도 어려운 코드가 됨

명시적 믹스인은 클래스의 복사 기능과 같지 않음
이는 객체 그 자체가 아니라 단지 공유된 레퍼런스만 복사하기 때문