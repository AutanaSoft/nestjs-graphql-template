const MIN_COVERAGE = 95;

const config = {
  all: true,
  exclude: ['src/main.ts', 'src/core/graphql/generated/**'],
  'check-coverage': false,
  branches: MIN_COVERAGE,
  lines: MIN_COVERAGE,
  functions: MIN_COVERAGE,
  statements: MIN_COVERAGE,
  reporter: ['lcov', 'json', 'text'],
};

module.exports = config;
