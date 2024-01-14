import type { Config } from 'jest';

const config: Config = {
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  testEnvironment: 'node',
  cacheDirectory: '.tmp/jestCache',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  coveragePathIgnorePatterns: ['src/core/graphql/generated/'],
  setupFiles: ['<rootDir>.jest/set-env-vars.ts'],
  clearMocks: true,
  coverageReporters: ['json', 'lcov', 'text'],
};

export default config;
