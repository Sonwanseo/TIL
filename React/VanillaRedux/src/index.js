import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const Add = "Add";
const Minus = "Minus";

const countModifier = (count = 0, action) => {
  switch (action.type) {
    case Add:
      return count + 1;
    case Minus:
      return count - 1;
    default:
      return count;
  }
};

const countStore = createStore(countModifier);

const onChange = () => {
  number.innerText = countStore.getState();
};

countStore.subscribe(onChange);

const handleAdd = () => {
  countStore.dispatch({ type: "Add" });
};

const handleMinus = () => {
  countStore.dispatch({ type: "Minus" });
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
