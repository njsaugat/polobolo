import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../../../../App";
import Login from "../Login";
import * as ReactDOM from "react-dom";
test("demo", () => {
  expect(true).toBe(true);
});

test("Renders the main page", () => {
  //   render(<App />);
  render(<App />);
  expect(true).toBeTruthy();
});

describe("Login component tests", () => {
  let container: HTMLDivElement;
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(<Login />, container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
  });
  it("Renders all inputs fields correctly", () => {
    const inputs = container.querySelectorAll("input");
    expect(inputs).toHaveLength(2);

    expect(inputs[0].name.toLowerCase()).toBe("email");
    expect(inputs[1].name.toLowerCase()).toBe("email");
  });
});
