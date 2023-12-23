import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackErrorBoundary } from "./FallbackErrorBoundary";

const BuggyCounter = () => {
  const [counter, setCounter] = useState(0);
  if (counter === 5) {
    throw new Error("I crashed");
  }
  return (
    <button
      className="border-8"
      onClick={() => {
        setCounter((prevCount) => prevCount + 1);
      }}
    >
      {counter}
    </button>
  );
};

const TestErrorBoundary = () => {
  return (
    <div className="p-10">
      <div> Hey</div>
      <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
        <BuggyCounter />
        <br />
        <BuggyCounter />
      </ErrorBoundary>

      <hr />
      <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
        <BuggyCounter />
      </ErrorBoundary>
      <br />

      <ErrorBoundary FallbackComponent={FallbackErrorBoundary}>
        <BuggyCounter />
      </ErrorBoundary>
    </div>
  );
};

export default TestErrorBoundary;
