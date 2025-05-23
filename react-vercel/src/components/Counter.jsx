import { useState } from "react";
import "./Counter.css";
const Counter = () => {
  // console.log("Array Is", array);
  const [count, setCount] = useState(-10);

  const increase = () => {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 2);
    setCount((prev) => prev + 3);
  };
  return (
    <>
      <h1>Counter {count}</h1>
      <button onClick={increase}>Increment</button>
      <button onClick={increase}>decrement</button>
      <button onClick={increase}>Reset</button>
    </>
  );
};

export default Counter;
