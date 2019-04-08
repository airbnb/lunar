const path = require('path');
const glob = require('fast-glob');

module.exports = async ({ config }) => {
  const babelConfig = config.module.rules[0];

  // Replace Flow with TypeScript
  babelConfig.test = /\.(j|t)sx?$/;
  babelConfig.exclude.push(/node_modules/);
  babelConfig.use[0].options.sourceType = 'unambiguous';
  babelConfig.use[0].options.presets[2] = require.resolve('@babel/preset-typescript');
  babelConfig.use.unshift({ loader: require.resolve('react-docgen-typescript-loader') });

  config.resolve.extensions.push('.ts', '.tsx');

  // Add custom Webpack aliases
  config.resolve.alias[':storybook'] = __dirname;

  // Use source files so we don't have duplicate and or stale components
  glob.sync(path.join(__dirname, '../packages/*/package.json')).forEach(filePath => {
    const { name } = require(filePath);

    config.resolve.alias[`${name}$`] = `${name}/src`;
    config.resolve.alias[`${name}/lib`] = `${name}/src`;
  });

  // Temporary fix until Storybook supports core-js v3
  delete config.resolve.alias['core-js'];

  config.resolve.alias['core-js/modules/es.string.match$'] = path.resolve(
    __dirname,
    '../node_modules/core-js/modules/es.string.match',
  );

  config.resolve.alias['core-js/modules/es.string.replace$'] = path.resolve(
    __dirname,
    '../node_modules/core-js/modules/es.string.replace',
  );

  config.resolve.alias['core-js/modules/es.string.split$'] = path.resolve(
    __dirname,
    '../node_modules/core-js/modules/es.string.split',
  );

  config.resolve.alias['core-js/modules/web.dom-collections.iterator$'] = path.resolve(
    __dirname,
    '../node_modules/core-js/modules/web.dom-collections.iterator',
  );

  config.resolve.alias['core-js'] = path.resolve(
    __dirname,
    '../node_modules/@storybook/core/node_modules/core-js',
  );

  return config;
};
