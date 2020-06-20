import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const countModifier = (count = 0, action) => {
  if (action.type === "Add") {
    return count + 1;
  } else if (action.type === "Minus") {
    return count - 1;
  }
  return count;
};

const countStore = createStore(countModifier);

countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Add" });
countStore.dispatch({ type: "Minus" });

console.log(countStore.getState());
