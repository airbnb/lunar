const path = require('path');

module.exports = async ({ config }) => {
  const babelRule = config.module.rules[0];

  // Enable TypeScript support
  config.module.rules.push({
    ...babelRule,
    test: /\.tsx?$/,
    use: [
      {
        loader: 'babel-loader',
      },
      {
        loader: 'react-docgen-typescript-loader',
      },
    ],
  });

  config.resolve.extensions.push('.ts', '.tsx');

  // Easily allow image imports
  config.resolve.alias = {
    ':image': path.join(__dirname, 'images'),
  };

  return config;
};
