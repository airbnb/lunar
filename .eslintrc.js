const EXTS = ['.ts', '.tsx', '.js', '.jsx', '.json'];

module.exports = {
  root: true,

  extends: ['airbnb', 'plugin:jsx-a11y/recommended', 'prettier', 'prettier/react'],

  plugins: ['import', 'react', 'compat', 'unicorn', 'prettier'],

  globals: {
    __DEV__: true,
    jsdom: true,
    newrelic: true,
  },

  env: {
    browser: true,
  },

  settings: {
    propWrapperFunctions: ['forbidExtraProps', 'exact', 'Object.freeze'],
    'import/ignore': ['node_modules', '\\.json$'],
    'import/extensions': EXTS,
    'import/resolver': {
      node: {
        extensions: EXTS,
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },

  rules: {
    'class-methods-use-this': 'off',
    // 'multiline-ternary': 'off',

    // Not enabled in Airbnb config
    'func-name-matching': [
      'error',
      'always',
      {
        includeCommonJSModuleExports: false,
      },
    ],
    'max-classes-per-file': ['error', 1],
    'newline-before-return': 'error',
    'no-async-promise-executor': 'error',
    'no-constant-condition': 'error',
    'no-div-regex': 'error',
    'no-eq-null': 'error',
    'no-implicit-coercion': 'error',
    'no-misleading-character-class': 'error',
    'no-native-reassign': 'error',
    'no-negated-condition': 'error',
    'no-useless-call': 'error',
    'no-useless-catch': 'error',
    'prefer-object-spread': 'error',
    'require-atomic-updates': 'error',

    // COMPAT
    'compat/compat': 'warn',

    // IMPORT
    'import/default': 'error',
    'import/namespace': 'error',
    'import/imports-first': 'error',

    // PRETTIER
    'prettier/prettier': 'error',

    // REACT
    'react/jsx-handler-names': [
      'error',
      {
        eventHandlerPrefix: 'handle',
        eventHandlerPropPrefix: 'on',
      },
    ],
    'react/jsx-key': 'error',
    'react/jsx-sort-default-props': [
      'error',
      {
        ignoreCase: true,
      },
    ],
    'react/no-did-mount-set-state': 'error',
    'react/no-did-update-set-state': 'off',
    'react/no-direct-mutation-state': 'error',
    'react/sort-comp': [
      'error',
      {
        order: ['statics', 'properties', 'lifecycle', 'everything-else', 'handlers', 'renderers'],
        groups: {
          statics: ['propTypes', 'defaultProps', 'contextTypes', 'childContextTypes'],
          properties: [
            '/^(?!on).+$/',
            '/^(?!handle).+$/',
            '/^(?!render).+$/',
            '/^.+Ref$/',
            'state',
          ],
          lifecycle: [
            'constructor',
            'getDerivedStateFromProps',
            'componentDidMount',
            'shouldComponentUpdate',
            'getSnapshotBeforeUpdate',
            'componentDidUpdate',
            'componentDidCatch',
            'componentWillUnmount',
          ],
          handlers: ['/^on.+$/', '/^handle.+$/'],
          renderers: ['/^render.+$/', 'render'],
        },
      },
    ],

    // UNICORN
    'unicorn/catch-error-name': 'error',
    'unicorn/custom-error-definition': 'error',
    'unicorn/error-message': 'error',
    'unicorn/escape-case': 'error',
    'unicorn/explicit-length-check': 'error',
    'unicorn/filename-case': 'off',
    'unicorn/import-index': 'error',
    'unicorn/new-for-builtins': 'error',
    'unicorn/no-abusive-eslint-disable': 'off',
    'unicorn/no-array-instanceof': 'error',
    'unicorn/no-hex-escape': 'error',
    'unicorn/no-fn-reference-in-iterator': 'error',
    'unicorn/no-new-buffer': 'error',
    'unicorn/no-process-exit': 'error',
    'unicorn/no-zero-fractions': 'error',
    'unicorn/number-literal-case': 'error',
    'unicorn/prefer-add-event-listener': 'error',
    'unicorn/prefer-exponentiation-operator': 'error',
    'unicorn/prefer-includes': 'error',
    'unicorn/prefer-node-remove': 'error',
    'unicorn/prefer-starts-ends-with': 'error',
    'unicorn/prefer-spread': 'off',
    'unicorn/prefer-text-content': 'error',
    'unicorn/prefer-type-error': 'error',
    'unicorn/regex-shorthand': 'error',
    'unicorn/throw-new-error': 'error',
  },

  overrides: [
    {
      files: ['*.{ts,tsx}'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.options.json',
      },
      plugins: ['@typescript-eslint'],
      rules: {
        'no-restricted-globals': 'off',
        'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true }],

        // IMPORT
        'import/extensions': [
          'error',
          'never',
          {
            json: 'always',
          },
        ],
        'import/named': 'off',
        'import/no-cycle': 'off',
        'import/no-named-as-default': 'off',

        // REACT
        'react/default-props-match-prop-types': 'off',
        'react/destructuring-assignment': 'off', // Broken with class properties
        'react/forbid-prop-types': 'off',
        'react/jsx-filename-extension': [
          'error',
          {
            extensions: ['.tsx'],
          },
        ],
        'react/no-unused-prop-types': 'off',
        'react/prefer-stateless-function': 'off',
        'react/require-default-props': 'off',

        // TYPESCRIPT
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/member-delimiter-style': 'error',
        '@typescript-eslint/member-ordering': 'off', // Prefer react/sort-comp
        '@typescript-eslint/no-angle-bracket-type-assertion': 'error',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-interface': 'error',
        '@typescript-eslint/no-for-in-array': 'error',
        '@typescript-eslint/no-parameter-properties': 'error',
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/no-triple-slash-reference': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { vars: 'all', args: 'none', ignoreRestSiblings: true },
        ],
        '@typescript-eslint/no-use-before-define': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/type-annotation-spacing': 'error',
      },
    },
    {
      files: ['*.test.{js,jsx,ts,tsx}'],
      plugins: ['jest'],
      env: {
        jest: true,
        node: true,
      },
      rules: {
        'max-classes-per-file': 'off',
        'no-magic-numbers': 'off',
        'sort-keys': 'off',

        // A11Y
        'jsx-a11y/anchor-is-valid': 'off',

        // IMPORT
        'import/no-extraneous-dependencies': 'off',

        // JEST
        'jest/expect-expect': 'error',
        'jest/no-disabled-tests': 'error',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/no-jest-import': 'error',
        'jest/no-test-callback': 'error',
        'jest/prefer-to-be-null': 'error',
        'jest/prefer-to-be-undefined': 'error',
        'jest/prefer-to-have-length': 'error',
        'jest/valid-expect': 'error',

        // UNICORN
        'unicorn/no-fn-reference-in-iterator': 'off',
      },
    },
    {
      files: ['*.story.{ts,tsx}'],
      rules: {
        'max-classes-per-file': 'off',
        'import/no-extraneous-dependencies': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'react/no-multi-comp': 'off',
      },
    },
  ],
};
