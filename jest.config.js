module.exports = {
  testEnvironment: "jsdom",
  // Automatically clear mock calls and instances between every test
  clearMocks: true,
  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // A set of global variables that need to be available in all test environments
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
    },
  },
  // An array of file extensions your modules use
  moduleFileExtensions: ["ts", "tsx", "js"],
  // The glob patterns Jest uses to detect test files
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
}
