const ESM = process.env.BUILD === 'esm';

const plugins = [
  // 'react-hot-loader/babel',
  [
    'babel-plugin-transform-dev',
    {
      evaluate: false,
    },
  ],
  'babel-plugin-typescript-to-proptypes',
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-optional-catch-binding',
  '@babel/plugin-syntax-dynamic-import',
];

if (process.env.NODE_ENV === 'test') {
  plugins.push('babel-plugin-dynamic-import-node');
}

const ignore = [
  'node_modules/',
  'public/',
  'esm/',
  'lib/',
  'tmp/',
  'dist/',
  '__tests__',
  '__mocks__',
];

if (!process.env.STORYBOOK) {
  ignore.push(/\.story\.tsx?$/);
}

module.exports = {
  ignore,
  plugins,
  presets: [
    [
      '@babel/preset-env',
      {
        // corejs: 3,
        loose: true,
        modules: ESM ? false : 'commonjs',
        shippedProposals: true,
        // useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
