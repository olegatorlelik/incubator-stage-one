/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  testTimeout: 100000, // resolve -> thrown: "Exceeded timeout of 5000 ms for a test".
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  testRegex: '.e2e.ts$',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
