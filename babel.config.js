const ESM = process.env.BUILD === 'esm';

module.exports = {
  ignore: ['node_modules/', 'public/', 'esm/', 'lib/', 'tmp/', 'dist/', '__tests__', '__mocks__'],
  plugins: [
    // 'react-hot-loader/babel',
    // 'babel-plugin-dynamic-import-node',
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
        regenerator: false,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
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
