#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('fast-glob');
const upperFirst = require('lodash/upperFirst');
const Parser = require('remark-parse/lib/parser');

function createHeader(packageName, componentName, imports = []) {
  return `import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
${Array.from(imports).join('\n')}
import ${componentName} from './${componentName}';

storiesOf('${upperFirst(packageName)}/${componentName}', module)`;
}

function createStory(title, markup) {
  return `.add('${title}', () => ${markup})`;
}

function cleanupCode(baseCode, componentName) {
  let code = baseCode.trim();
  const count = (code.match(new RegExp(`<${componentName}`, 'g')) || []).length;

  if (code.slice(-1) === ';') {
    code = code.slice(0, -1);
  }

  if (count > 1) {
    code = `<>${code}</>`;
  }

  return code.replace(/'\.\.\//g, "'./").replace(/debug\(/g, 'action(');
}

function extractImports(baseCode) {
  const imports = [];
  const code = baseCode.replace(
    /import ([a-z0-9,{} ]+) from '([a-z0-9./:]+)';/giu,
    (match, specifiers, basePath) => {
      const importPath = basePath
        .replace(':core', '@airbnb/lunar/lib')
        .replace(':icons', '@airbnb/lunar-icons/lib');

      imports.push(`import ${specifiers} from '${importPath}';`);

      return '';
    },
  );

  return {
    code,
    imports,
  };
}

function convertToStory(filePath) {
  const componentName = path.basename(path.dirname(filePath));
  const packageName = path.basename(filePath.split('/src')[0]);
  const storyPath = filePath.replace('/README.md', '.story.tsx');

  console.log(`Converting ${componentName}`);

  return fs.readFile(filePath, 'utf8').then(contents => {
    const ast = new Parser(filePath, contents).parse();
    const story = [];
    let imports = new Set();
    let title = '';

    ast.children.forEach(node => {
      if (node.type === 'paragraph') {
        title = '';

        node.children.forEach(pg => {
          if (pg.type === 'text') {
            title += pg.value.replace('\n', '  ');
          }
        });
      } else if (node.type === 'code') {
        const result = extractImports(cleanupCode(node.value, componentName));

        imports = new Set([...imports, ...result.imports]);

        story.push(createStory((title || 'NO TITLE').replace(/\s{2,}/g, ' '), result.code.trim()));
      } else {
        throw new Error(`Unsupported node type ${node.type}`);
      }
    });

    story.unshift(createHeader(packageName, componentName, imports));

    return fs.writeFile(storyPath, story.join(''), 'utf8');
  });
}

const cwd = process.argv[2];

if (!cwd) {
  console.error(chalk.red('Please provide a folder path to convert.'));
  process.exit(1);
}

glob
  .async('**/components/*/README.md', {
    absolute: true,
    cwd: path.join(process.cwd(), cwd),
    ignore: ['node_modules'],
  })
  .then(filePaths => Promise.all(filePaths.map(filePath => convertToStory(String(filePath)))));
