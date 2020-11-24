let count = 0; // 숫자
count += 1;
// count = "갑자기 분위기 문자열"; // 이러면 에러가 납니다!

const message: string = "hello world"; // 문자열

const done: boolean = true; // 불리언 값

const numbers: number[] = [1, 2, 3]; // 숫자 배열
const messages: string[] = ["hello", "world"]; // 문자열 배열

// messages.push(1); // 숫자 넣으려고 하면 안된다!

let mightBeUndefined: string | undefined = undefined;
let nullableNumber: number | null = null;

// let color: "red" | "orange" | "yellow" = "red"; // red, orange, yellow 중 하나
// color = "yellow";
// color = "green"; // 에러 발생
