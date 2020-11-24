"use strict";
function sum(x, y) {
    return x + y;
}
sum(1, 2); // returns 3
function sumArray(numbers) {
    return numbers.reduce(function (acc, current) { return acc + current; }, 0);
}
var total = sumArray([1, 2, 3, 4, 5]); // returns 15
function returnNothing() {
    console.log("I am just saying hello world");
}
