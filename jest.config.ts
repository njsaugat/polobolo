import type { Config } from "@jest/types";

const esModules = ["lodash-es", "nanoid"].join("|");

const config: Config.InitialOptions = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
    "^lodash-es(/(.*)|$)": "lodash$1",
    "^nanoid(/(.*)|$)": "nanoid$1",
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
};

export default config;
