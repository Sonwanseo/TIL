/*
    타입 추론
*/

// TypeScript는 JavaScript 언어를 알고 있으며 대부분의 경우 타입을 생성해준다.
let helloWorld = "Hello World";

/*
    타입 정의
*/

// 객체 생성
const userObj = {
  name: "Hayes",
  id: 0,
};

// 인터페이스
// 객체의 형태를 명시적으로 나타내기 위해 사용
interface User {
  name: string;
  id: number;
}

class UserAccount {
  name: string;
  id: number;

  constructor(name: string, id: number) {
    this.name = name;
    this.id = id;
  }
}

const user: User = new UserAccount("Murphy", 1);

// 리턴값으로 User 타입 반환
function getAdminUser(): User {
  return {
    name: "admin",
    id: 3,
  };
}

function deleteUser(): User {
  return {
    name: "delete",
    id: 4,
  };
}

/*
    타입구성
*/

// 유니언 Unions
// 여러 타입 중 하나일 수 있음을 선언하는 방법
type myBool = true | false;

// 유니언이 가장 많이 사용된 사례 중 하나는 값이 다음과 같이 허용되는 string 또는 number의 리터럴집합을 설명할 때
type WindowStates = "open" | "closed" | "minimized";
type LockStates = "locked" | "unlocked";
type OddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;

// typeof obj === 'string'으로 string과 array를 구분할 수 있다.
function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj];
  } else {
    return obj;
  }
}

/*
    제네릭
*/

// 제네릭은 타입에 변수를 제공하는 방법이다.
// 배열이 일반적인 예시이며, 제네릭이 없는 배열은 어떤 것이든 포함할 수 있다.
// 제네릭이 있는 배열은 배열 안의 값을 설명할 수 있다.
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

// 제네릭을 사용하는 고유 타입 선언 가능
interface Backpack<Type> {
  add: (obj: Type) => void;
  get: () => Type;
}

declare const backpack: Backpack<string>;

// object는 string이다.
const object = backpack.get();

// 매개변수가 string 값이 아니므로 에러가 출력된다.
backpack.add(23);

/*
    구조적 타입 시스템
*/

// TS의 핵심 원칙 중 하나는 타입 검사가 값이 있는 형태에 집중한다는 것
// 이는 '덕 타이핑' 또는 '구조적 타이핑' 이라 불리기도 한다.

// 구조적 타이핑에서 두 객체가 같은 형태를 가지면 같은 것으로 간주됨
interface Point {
  x: number;
  y: number;
}

function printPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// "12, 26"을 출력합니다.
const point = { x: 12, y: 26 };
printPoint(point);

// point 변수는 Point 타입이라고 선언된 적은 없으나, point의 형태와 Point의 형태를 비교했을 때
// 같으므로 같은 타입으로 인식한다.

// 형태 일치에는 일치시킬 객체의 필드의 하위 집합만 필요하다.
// 이외의 값은 ignore한다.
interface Point1 {
  x: number;
  y: number;
}

function printPoint1(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

const point3 = { x: 12, y: 26, z: 89 };
printPoint1(point3); // prints "12, 26"

const rect = { x: 33, y: 3, width: 30, height: 80 };
printPoint1(rect); // prints "12, 26"

const color = { hex: "#187ABF" };
printPoint1(color); // error

// 정확하게 마무리 짓기 위해, 구조적으로 클래스와 객체가 형태를 따르는 방법에는 차이가 없다.
interface Point2 {
  x: number;
  y: number;
}

function printPoint2(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 56);
printPoint2(newVPoint); // prints "13, 56";

// 객체 또는 클래스에 필요한 모든 속성이 존재한다면, TypeScript는 구현 세부 정보에 관계없이 일치하게 본다.
