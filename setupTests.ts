// setupTests.ts
// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
jest.mock("nanoid", () => {
  return {
    nanoid: () => {},
  };
});
