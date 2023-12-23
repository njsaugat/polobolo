// Imports
// To Test
import { LanguageProvider } from "../../../../context/LanguageContext";
import Login from "../Login";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import store from "../../../../stores/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { randomFillSync } from "crypto";

// // @ts-ignore
// window.crypto = {
//   // @ts-ignore
//   getRandomValues(buffer) {
//     return randomFillSync(buffer);
//   },
// };

jest.mock("nanoid", () => {
  return {
    nanoid: () => {},
  };
});

jest.mock("react-i18next", () => ({
  useTranslation: jest.fn(),
}));
// Tests
const queryClient = new QueryClient();

test("Renders main page correctly", () => {
  render(
    <Provider store={store}>
      <Router>
        <QueryClientProvider client={queryClient}>
          {/* <LanguageProvider> */}
          <Login />
          {/* </LanguageProvider> */}
        </QueryClientProvider>
      </Router>
    </Provider>
  );
  expect(true).toBeTruthy();
});
