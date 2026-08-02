module.exports = {
  verbose: true,
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '**/src/**/**/*.{js,ts}'
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      functions: 90,
      branches: 90,
      lines: 90
    }
  },

  coverageReporters: ['json', 'lcov', 'text'],
  // Emit JUnit results into the same coverage/ dir the orb stores as test results.
  reporters: [
    'default',
    ['jest-junit', { outputDirectory: '<rootDir>/coverage', outputName: 'junit.xml' }]
  ],
  testEnvironment: 'node',
  maxWorkers: process.env.CI ? 2 : '50%',
  workerIdleMemoryLimit: '512MB',
  // .ts is compiled + type-checked by ts-jest (against tsconfig.json);
  // .js still goes through babel-jest so the ESM node_modules below can be transpiled.
  transform: {
    // ignoreCodes 151002: ts-jest warns that module:nodeNext "prefers" isolatedModules,
    // but we keep isolatedModules off so ts-jest type-checks the tests. Warning is noise.
    '^.+\\.ts$': ['ts-jest', { diagnostics: { ignoreCodes: [151002] } }],
    '^.+\\.js$': 'babel-jest'
  },

  // Do not ignore these node_modules packages — whitelist packages that ship ESM.
  transformIgnorePatterns: [
    'node_modules/(?!(@faker-js/faker|@mojaloop/ml-testing-toolkit-shared-lib|json-schema-ref-parser|json-schema-faker|commander)/)'
  ]
}
