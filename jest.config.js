const {defaults} = require('jest-config');

module.exports = {
  notify: true,
  notifyMode: 'failure-success',

  collectCoverage: true,
  coverageReporters: process.env.CI ? ['lcov'] : ['text', 'text-summary', 'html'], // eslint-disable-line no-process-env
  collectCoverageFrom: [
    '!.next/**/*',
    '!node_modules/**/*',
    '!coverage/**/*',
    '!out/**/*',
    '!**/*.d.ts',
    '!**/*.json',
  ],
  testPathIgnorePatterns: [
    '/coverage/',
    '/node_modules/',
    '/.next/',
    '/out/',
  ],

  projects: [
    {
      displayName: 'test',

      setupFilesAfterEnv: [
        '@testing-library/jest-dom',
      ],

      moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    },
    {
      displayName: 'lint',
      runner: 'jest-runner-eslint',
      testMatch: ["<rootDir>/**/*.ts*"]
    },
  ],
};
