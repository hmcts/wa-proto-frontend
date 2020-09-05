module.exports = {
  roots: ['<rootDir>/src/test/unit'],
  testRegex: "(/src/test/.*|\\.(test|spec))\\.(ts|js)$",
  moduleFileExtensions: [
    "ts",
    "js"
  ],
  testEnvironment: "node",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverageFrom: [
    '!src/main/development.ts', 
    '!src/main/client/**',
    '!src/main/app.ts', 
    '!webpack/app.js',
    '!src/main/modules/**',
    '!src/main/router/routerFinder.ts',
    '!src/main/routes/health.ts'
  ],
  coverageThreshold: {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": -10
    }
  },
  
}
