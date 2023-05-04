/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'reports',
      },
    ],
  ],
  collectCoverage: true,
  coverageDirectory: 'reports/coverage',
};
