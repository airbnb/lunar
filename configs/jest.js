module.exports = {
  coveragePathIgnorePatterns: [
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
  setupFilesAfterEnv: ['@airbnb/config-jest/aphrodite', '@airbnb/config-jest/enzyme'],
  timers: 'real',
};
