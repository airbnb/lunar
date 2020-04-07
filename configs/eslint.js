module.exports = {
  extends: ['plugin:rut/recommended'],

  rules: {
    'class-methods-use-this': 'off',

    // This seems to fail for string props also...
    'react/jsx-no-literals': 'off',

    // Disabled until we migrate to hooks
    'react/no-did-update-set-state': 'off',
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': 'off',

        // Is kind of useless because lots of false positives
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx', 'story.tsx', '*.story.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'jest/require-to-throw-message': 'off', // Prop type errors
        'react/jsx-no-literals': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
    {
      files: ['story.tsx', '*.story.tsx'],
      env: {
        node: true,
      },
      globals: {
        action: 'readonly',
      },
      rules: {
        'max-classes-per-file': 'off',
        'no-console': 'off',

        // Webpack alias imports
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
      },
    },
    {
      files: ['styles.ts'],
      rules: {
        'import/prefer-default-export': 'off',
      },
    },
  ],
};
