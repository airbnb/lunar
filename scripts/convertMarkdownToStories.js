#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('fast-glob');
const Parser = require('remark-parse/lib/parser');

function createHeader(packageName, componentName) {
  return `import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ${componentName} from './${componentName}';

storiesOf('${packageName}/${componentName}', module)`;
}

function createStory(title, markup) {
  return `.add('${title}', () => ${markup})`;
}

function convertToStory(filePath) {
  const componentName = path.basename(path.dirname(filePath));
  const packageName = path.basename(filePath.split('/src')[0]);
  const storyPath = filePath.replace('/README.md', '.story.tsx');

  console.log(`Converting ${componentName}`);

  return fs.readFile(filePath, 'utf8').then(contents => {
    const ast = new Parser(filePath, contents).parse();
    const story = [createHeader(packageName, componentName)];
    let title = '';

    ast.children.forEach(node => {
      if (node.type === 'paragraph') {
        node.children.forEach(pg => {
          if (pg.type === 'text') {
            title += pg.value.replace('\n', ' ');
          }
        });
      } else if (node.type === 'code') {
        let code = node.value;
        const count = (code.match(new RegExp(`<${componentName}`, 'g')) || []).length;

        if (count > 1) {
          code = `<>${code}</>`;
        }

        story.push(createStory(title || 'NO TITLE', code));
      } else {
        throw new Error(`Unsupported node type ${node.type}`);
      }
    });

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
