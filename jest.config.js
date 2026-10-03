const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/", "/helpers/"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  collectCoverageFrom: [
    "components/**/*.{js,jsx}",
    "utils/**/*.{js,jsx}",
    "services/**/*.{js,jsx}",
    "context/**/*.{js,jsx}",
    "hooks/**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/.next/**",
  ],
};

module.exports = createJestConfig(config);
