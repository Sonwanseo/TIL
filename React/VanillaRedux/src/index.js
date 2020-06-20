import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

number.innerText = 0;

const countModifier = (count = 0, action) => {
  if (action.type === "Add") {
    return count + 1;
  } else if (action.type === "Minus") {
    return count - 1;
  }
  return count;
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
