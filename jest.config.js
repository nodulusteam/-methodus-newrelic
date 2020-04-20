module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/src/test/*.spec.ts"
  ],

  "collectCoverage": true,
  "coverageReporters": ["json", "lcov", "text", "clover"],
  "coverageThreshold": {
    "global": {
      "branches": 50,
      "functions": 60,
      "lines": 60,
      "statements": 60
    }
  }
};