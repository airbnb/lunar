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
  [
    '@babel/plugin-transform-runtime',
    {
      corejs: 3,
      regenerator: false,
    },
  ],
];

if (process.env.NODE_ENV === 'test') {
  plugins.push('babel-plugin-dynamic-import-node');
}

module.exports = {
  ignore: [
    'node_modules/',
    'public/',
    'esm/',
    'lib/',
    'tmp/',
    'dist/',
    '__tests__',
    '__mocks__',
    /\.story\.tsx?$/,
  ],
  plugins,
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        loose: true,
        modules: ESM ? false : 'commonjs',
        shippedProposals: true,
        useBuiltIns: 'usage',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
};
