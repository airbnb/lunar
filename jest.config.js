module.exports = {
  collectCoverageFrom: ['**/src/**/*.{ts,tsx}', '**/test/**/*.{ts,tsx}'],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    'node_modules/',
    'public/',
    'esm/',
    'lib/',
    'tmp/',
    'dist/',
    'mock.ts',
    'story.tsx',
    // We don't need tests for these files
    'core/src/components/DatePickerInput/Input',
    'core/src/utils/getLocaleFromClient',
    'icons/src',
    'test-utils/src',
    // Quite difficult to test
    'core/src/components/GradientScroller',
    'core/src/components/HierarchyPicker',
    'core/src/components/ResponsiveImage',
    // Requires context support in Enzyme to test correctly
    'forms/src/components/FormActions',
    // Requires hook support in Enzyme to test correctly
    'apollo/src/components/Mutation',
    'apollo/src/components/Query',
    // Deprecated, remove in next major
    'childrenWithComponentName',
  ],
  coverageReporters: ['lcov', 'json-summary', 'html'],
  coverageThreshold: {
    global: {
      statements: 85,
      branches: 75,
      functions: 85,
      lines: 85,
    },
    './packages/*/{src,test}/**/*.{ts,tsx}': {
      statements: 85,
      branches: 75,
      functions: 85,
      lines: 85,
    },
  },
  globals: {
    __DEV__: true,
  },
  moduleFileExtensions: ['mock.js', 'ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(ttf|eot|svg|woff|woff2|mp3|png|jpg|jpeg|gif|css|scss)$': './test/fileMock.js',
  },
  roots: ['<rootDir>/packages'],
  setupFiles: ['./test/setup.js'],
  setupFilesAfterEnv: ['./test/setupAfterEnv.js', '@testing-library/react/cleanup-after-each'],
  testEnvironment: './test/environment.js',
  testURL: 'http://localhost',
  verbose: false,
};
