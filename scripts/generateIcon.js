#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Svgo = require('svgo');
const glob = require('fast-glob');
const upperFirst = require('lodash/upperFirst');
const camelCase = require('lodash/camelCase');

const filePattern = process.argv[2];

if (!filePattern) {
  console.error(chalk.red('Glob/file pattern not defined.'));
  process.exit(1);
}

const SVG_ROOT = path.join(__dirname, '../svgs');
const ICON_ROOT = path.join(__dirname, '../packages/icons/src');

const svgo = new Svgo({
  full: true,
  plugins: [
    { removeDimensions: true },
    { removeDoctype: true },
    { removeXMLProcInst: true },
    { removeComments: true },
    { removeMetadata: true },
    { removeTitle: true },
    { removeDesc: true },
    { removeUselessDefs: true },
    { removeXMLNS: true },
    { removeEditorsNSData: true },
    { removeHiddenElems: true },
    { removeEmptyText: true },
    { removeEmptyContainers: true },
    { cleanupEnableBackground: true },
    { removeEmptyAttrs: true },
    { convertPathData: true },
    { convertTransform: true },
    { removeUnknownsAndDefaults: true },
    { removeNonInheritableGroupAttrs: true },
    { removeUselessStrokeAndFill: true },
    { removeUnusedNS: true },
    { cleanupIDs: true },
    { cleanupNumericValues: true },
    { cleanupListOfValues: true },
    { collapseGroups: true },
    { mergePaths: true },
    { convertShapeToPath: true },
  ],
});

function createIcon(srcPath) {
  return svgo.optimize(fs.readFileSync(srcPath, 'utf8')).then(result => {
    if (!result || !result.data) {
      throw new Error('Unable to create optimized SVG.');
    }

    const compName = `Icon${upperFirst(camelCase(path.basename(srcPath, '.svg')))}`;
    const dstPath = path.join(ICON_ROOT, path.dirname(srcPath.split('svgs')[1]), `${compName}.tsx`);

    fs.writeFileSync(
      dstPath,
      `import React from 'react';
import withIcon, { Props } from '../withIcon';

function ${compName}(props: Props) {
  return ${result.data.replace('<svg', '<svg {...props}')};
}

export default withIcon('${compName}')(${compName});`,
      'utf8',
    );

    console.log(`Generated ${compName}`);
  });
}

glob(filePattern, {
  absolute: true,
  cwd: SVG_ROOT,
})
  .then(svgPaths => Promise.all(svgPaths.map(svgPath => createIcon(svgPath))))
  .catch(error => {
    console.error(chalk.red(`Failed to generate icons. ${error.message}`));
    process.exit(1);
  });
