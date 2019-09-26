module.exports = {
  rules: {
    'class-methods-use-this': 'off',

    // This seems to fail for string props also...
    'react/jsx-no-literals': 'off',

    // Disabled until we migrate to hooks
    'react/no-did-update-set-state': 'off',
    'react/prefer-stateless-function': 'off',
  },

  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/consistent-type-assertions': 'off',
      },
    },
    {
      files: ['*.test.ts', '*.test.tsx', 'story.tsx', '*.story.tsx'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'react/jsx-no-literals': 'off',
      },
    },
    {
      files: ['story.tsx', '*.story.tsx'],
      env: {
        node: true,
      },
      rules: {
        'max-classes-per-file': 'off',

        // Webpack alias imports
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
      },
    },
  ],
};
