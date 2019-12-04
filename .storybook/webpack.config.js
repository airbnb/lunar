const path = require('path');
const glob = require('fast-glob');
const webpack = require('webpack');
const getChangelogFromGitHistory = require('./helpers/getChangelogFromGitHistory');
const tsConfig = require('../tsconfig.options.json');

module.exports = async ({ config }) => {
  const babelConfig = config.module.rules[0];

  // Replace Flow with TypeScript
  babelConfig.test = /\.(j|t)sx?$/;
  babelConfig.exclude.push(/node_modules/);
  babelConfig.use[0].options.sourceType = 'unambiguous';
  babelConfig.use[0].options.presets[2] = require.resolve('@babel/preset-typescript');

  // Replace babel-plugin-react-docgen with react-docgen-typescript-loader
  babelConfig.use[0].options.plugins = babelConfig.use[0].options.plugins.filter(
    plugin =>
      typeof plugin === 'string' ||
      (Array.isArray(plugin) && !plugin[0].includes('babel-plugin-react-docgen')),
  );

  babelConfig.use.push({
    loader: 'react-docgen-typescript-loader',
    options: {
      compilerOptions: {
        ...tsConfig.compilerOptions,
        composite: undefined,
        moduleResolution: undefined,
        sourceMap: true,
      },
    },
  });

  // Set TypeScript extensions
  config.resolve.extensions.push('.ts', '.tsx');

  // Add custom Webpack aliases
  config.resolve.alias[':storybook'] = __dirname;

  // Use named modules so we have accurate file paths
  config.optimization.moduleIds = 'named';

  // Extract our git history for changelog purposes
  config.plugins.push(
    new webpack.DefinePlugin({
      COMPONENT_CHANGELOGS: JSON.stringify(getChangelogFromGitHistory()),
      'process.env.THEME': JSON.stringify(process.env.THEME || 'light'),
    }),
  );

  // Use source files so we don't have duplicate and or stale components
  glob.sync(path.join(__dirname, '../packages/*/package.json')).forEach(filePath => {
    const { name } = require(filePath);

    config.resolve.alias[`${name}$`] = `${name}/src`;
    config.resolve.alias[`${name}/lib`] = `${name}/src`;
  });

  return config;
};
