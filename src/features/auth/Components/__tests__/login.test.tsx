import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../../../../App";
import Login from "../Login";
import * as ReactDOM from "react-dom";
test("renders learn react link", () => {
  render(<Login />);
  const linkElement = screen.getByText(/email/i);
  expect(linkElement).toBeInTheDocument();
});
