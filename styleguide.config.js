const path = require('path');
const glob = require('fast-glob');
const camelCase = require('lodash/camelCase');
const upperFirst = require('lodash/upperFirst');
const docgenTypescript = require('react-docgen-typescript');

const sections = [
  {
    name: 'Lunar',
    content: './guide/README.md',
  },
];

const aliases = {
  ':core': path.join(__dirname, 'packages/core/src'),
  ':icons': path.join(__dirname, 'packages/icons/src'),
};

glob
  .sync('./packages/*/', {
    absolute: true,
    onlyDirectories: true,
  })
  .forEach(filePath => {
    const folder = path.basename(filePath);
    const { name } = require(path.join(filePath, 'package.json'));

    if (filePath.includes('metrics') || filePath.includes('test-utils')) {
      return;
    }

    sections.push({
      name: upperFirst(camelCase(folder)),
      content: `packages/${folder}/GUIDE.md`,
      components: `packages/${folder}/src/components/!(private)/+([a-zA-Z]).tsx`,
      sectionDepth: 1,
    });

    // Use source files so we don't have duplicate and or stale components
    aliases[`${name}$`] = `${name}/src`;
    aliases[`${name}/lib`] = `${name}/src`;
  });

function getPathImport(component) {
  let importPath = component
    .replace('packages/', '')
    .replace('src/', 'lib/')
    .replace('/index.tsx', '')
    .replace('.tsx', '');

  importPath = `lunar-${importPath}`.replace('lunar-core', 'lunar');

  const parts = importPath.split('lib/')[1].split('/');
  const name = parts[parts.length - 1];

  if (parts.length === 3) {
    return `import { ${name} } from '@airbnb/${path.dirname(importPath)}'`;
  }

  return `import ${name} from '@airbnb/${importPath}'`;
}

module.exports = {
  title: 'Lunar',
  usageMode: 'collapse',
  exampleMode: 'collapse',
  pagePerSection: true,
  skipComponentsWithoutExample: true,
  getComponentPathLine: getPathImport,
  propsParser: filePath => docgenTypescript.withCustomConfig('./tsconfig.json').parse(filePath),
  styleguideDir: 'public',
  sections,
  require: [path.join(__dirname, 'guide/setup.js')],
  moduleAliases: aliases,
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
        {
          test: /\.(png|jpg|jpeg)$/,
          loader: 'url-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    },
  },
};
