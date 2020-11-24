/*
    클래스 다시 생각하기 (Rethinking the Class)
*/

// 자유로운 함수와 데이터
// JS에서 함수는 어디에나 있을 수 있고, 데이터를 미리 정의된 'class'나 'struct'에 속하지 않고 자유롭게 전달할 수 있다.

// 정적 클래스
// C#과 Java의 싱글턴과 정적 클래스 같은 특정 구조는 TS에서는 필요하지 않다.

/*
    TypeSript의 OOP (OOP in TypeScript)
*/

// TS는 인터페이스, 상송, 정적 메서드 구현과 같은 많은 일반적인 패턴을 지원한다.

/*
    타입 다시 생각하기 (Rethinking Types)
*/

// 이름으로 구체화된 타입 시스템
// 런타임 시점에 정확한 타입을 묻기 위해 value.getType() 또는 value.getClass()와 같은 메서드를 호출할 수 있다.

// 집합으로서의 타입
// TS에서 타입은 공통의 무언가를 공유하는 값의 집합이라 생각하라.ㄴ
// 타입은 집합에 불과하므로, 특정한 값은 동시에 수많은 집합에 속할 수 있다.

// 삭제된 구조적 타입
// TS에서, 객체는 정확히 단일 타입이 아니다.
// 예를 들어 인터페이스를 만족하는 객체를 생성할 때, 둘 사이의 선언적인 관계가 없더라도 해당 인터페이스가 예상되는 곳에 해당 객체를 사용할 수 있습니다.

interface Pointlike {
  x: number;
  y: number;
}
interface Named {
  name: string;
}

function printPoint(point: Pointlike) {
  console.log("x = " + point.x + ", y = " + point.y);
}
function printName(x: Named) {
  console.log("Hello, " + x.name);
}

const obj = {
  x: 0,
  y: 0,
  name: "Origin",
};

printPoint(obj);
printName(obj);

// 구조적 타입화의 결과

// - 빈타입
// 빈타입은 예상을 무시하는 것처럼 보입니다.
class Empty {}

function fn(arg: Empty) {
  // 무엇인가를 하나요?
}

// 오류는 없지만, '빈' 타입은 아니지 않나요?
fn({ k: 10 });

// TS는 주어진 인수가 유효한 Empty인지 확인하여 fn의 호출이 유효한지 검사합니다.
// Empty에는 프로퍼티가 없으므로 Empty가 수행하는 모든 프로퍼티는 { k: 10 }에 속해있습니다.

// - 동일한 타입
class Car {
  drive() {
    // hit the gas
  }
}

class Golfer {
  drive() {
    // hit the ball for
  }
}

// No error?
let w: Car = new Golfer();

// 오류가 아닌 이유는 클래스의 구조가 동일하기 때문입니다.

// 반영
// 객체지향 프로그래머는 제네릭을 포함하여 어떤 값의 유형이라도 다룰 수 있음에 익숙합니다.

// C#
// static void PrintType<T>() {
//   console.WriteLine(typeof(T).Name);
// }

// TS의 타입 시스템이 완벽히 지워졌으므로, 제네릭 타입 인자의 인스턴스화와 같은 정보는 런타임에 사용할 수 없습니다.
// JS에는 typeof와 instanceof와 같은 제한된 원시요소가 있지만, 이런 연산자는 타입이 지워진 코드의 출력에 존재하므로 여전히 작동함을 알아야 합니다.
// ex) typeof (new Car())는 Car나 "Car"가 아닌 "object" 입니다.
