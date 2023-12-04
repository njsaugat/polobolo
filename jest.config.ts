import type { Config } from "@jest/types";

const esModules = ["lodash-es", "nanoid"].join("|");
const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.[jt]sx?$": "ts-jest",

    // process `*.tsx` files with `ts-jest`
  },
  transformIgnorePatterns: [
    `/node_modules/(?!${esModules})`,
    "\\.pnp\\.[^\\/]+$",
  ],
  moduleNameMapper: {
    // "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/test/__ mocks __/fileMock.js",
    "^lodash-es(/(.*)|$)": "lodash$1",
    "^nanoid(/(.*)|$)": "nanoid$1",
  },
};

export default config;
