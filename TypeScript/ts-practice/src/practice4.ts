type Person = {
  name: string;
  age?: number; // 물음표는 설정을 해도 되고 안 해도 되는 값
};

type Developer = Person & {
  skills: string[];
};

const person: Person = {
  name: "김사람",
};

const expert: Developer = {
  name: "김개발",
  skills: ["javascript", "react"],
};

type People = Person[]; // Person[] 을 앞으로 People 이라는 타입으로 사용할 수 있습니다.
const people: People = [person, expert];

type Color = "red" | "orange" | "yellow";
const color: Color = "red";
const colors: Color[] = ["red", "orange"];
