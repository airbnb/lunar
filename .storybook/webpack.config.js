const path = require('path');

module.exports = async ({ config }) => {
  console.log(config.module);

  // Enable TypeScript support
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      // Optional
      {
        loader: require.resolve('react-docgen-typescript-loader'),
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
