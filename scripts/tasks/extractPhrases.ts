import fs from 'fs';
import chalk from 'chalk';
import glob from 'fast-glob';
import * as t from '@babel/types';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

interface Phrase {
  key: string;
  message: string;
  contexts: string[];
}

type OnExtract = (key: string, phrase: string, context: string) => void;

function parseAndTraverse(filePath: string, cb: OnExtract) {
  console.log(`  ${chalk.gray(filePath.split('packages/')[1])}`);

  const code = fs.readFileSync(filePath, 'utf8');
  const ast = parser.parse(code, {
    sourceFilename: filePath,
    sourceType: 'module',
    plugins: [
      'jsx',
      'typescript',
      'classProperties',
      'dynamicImport',
      'nullishCoalescingOperator',
      'objectRestSpread',
      'optionalCatchBinding',
      'optionalChaining',
    ],
  });

  traverse(ast, {
    JSXOpeningElement({ node }) {
      if (t.isJSXIdentifier(node.name, { name: 'T' })) {
        let key = '';
        let phrase = '';
        let context = '';

        node.attributes.forEach(attr => {
          if (
            t.isJSXAttribute(attr) &&
            t.isJSXIdentifier(attr.name) &&
            t.isStringLiteral(attr.value)
          ) {
            switch (attr.name.name) {
              case 'k':
                key = attr.value.value;
                break;
              case 'phrase':
                phrase = attr.value.value;
                break;
              case 'context':
                context = attr.value.value;
                break;
            }
          }
        });

        if (!key) {
          throw new Error('<T/> found without a `k` prop.');
        } else if (!phrase) {
          throw new Error('<T/> found without a `phrase` prop.');
        }

        cb(key, phrase, context);
      }
    },
  });
}

glob(['packages/*/src/**/*.ts', 'packages/*/src/**/*.tsx'], {
  absolute: true,
  cwd: process.cwd(),
})
  .then(files => {
    console.log('Extracting...');

    const phrases: { [key: string]: Phrase } = {};

    const handleExtract: OnExtract = (key, message, context) => {
      if (!key.startsWith('lunar')) {
        throw new Error(`Key "${key}" does not start with "lunar".`);
      }

      const phrase = phrases[key];

      if (phrase) {
        if (message !== phrase.message) {
          throw new Error(`Key "${key}" found with different phrase messages.`);
        }

        phrase.contexts.push(context);
      } else {
        phrases[key] = {
          key,
          message,
          contexts: context ? [context] : [],
        };
      }
    };

    files.forEach(file => {
      if (file.includes('story')) {
        return;
      }

      parseAndTraverse(file, handleExtract);
    });

    return phrases;
  })
  .then(phrases => {
    console.log(`Found ${Object.keys(phrases).length} phrases`);

    fs.writeFileSync('phrases.json', JSON.stringify(phrases, null, 2), 'utf8');

    console.log('Complete!');
  })
  .catch(error => {
    console.error(chalk.red(error));
  });
