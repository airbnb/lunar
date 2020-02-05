import fs from 'fs';
import chalk from 'chalk';
import glob from 'fast-glob';
import * as t from '@babel/types';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';

const { I18N_PREFIX = 'lunar' } = process.env;

interface Phrase {
  key: string;
  phrase: string;
  contexts: Set<string>;
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
    CallExpression({ node }) {
      if (
        !t.isMemberExpression(node.callee) ||
        !t.isIdentifier(node.callee.object, { name: 'T' }) ||
        !t.isIdentifier(node.callee.property, { name: 'phrase' })
      ) {
        return;
      }

      const args = node.arguments;
      const obj = args[2];

      let key = '';
      let phrase = t.isStringLiteral(args[0]) ? args[0].value : '';
      let context = '';

      if (!t.isObjectExpression(obj)) {
        throw new Error('T.phrase() requires an object as the 3rd argument.');
      }

      obj.properties.forEach(prop => {
        if (t.isObjectProperty(prop) && t.isIdentifier(prop.key) && t.isStringLiteral(prop.value)) {
          const { name } = prop.key;
          const { value } = prop.value;

          if (name === 'key') {
            key = value.trim();
          } else if (name === 'context') {
            context = value.trim();
          }
        }
      });

      if (!key) {
        throw new Error('T.phrase() found without a `key`.');
      } else if (!phrase) {
        throw new Error('T.phrase() found without a `phrase`.');
      }

      cb(key, phrase, context);
    },

    JSXOpeningElement({ node }) {
      if (!t.isJSXIdentifier(node.name, { name: 'T' })) {
        return;
      }

      let key = '';
      let phrase = '';
      let context = '';

      node.attributes.forEach(attr => {
        if (
          t.isJSXAttribute(attr) &&
          t.isJSXIdentifier(attr.name) &&
          t.isStringLiteral(attr.value)
        ) {
          const { name } = attr.name;
          const { value } = attr.value;

          if (name === 'k') {
            key = value.trim();
          } else if (name === 'phrase') {
            phrase = value.trim();
          } else if (name === 'context') {
            context = value.trim();
          }
        }
      });

      if (!key) {
        throw new Error('<T/> found without a `k` prop.');
      } else if (!phrase) {
        throw new Error('<T/> found without a `phrase` prop.');
      }

      cb(key, phrase, context);
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
      if (!key.startsWith(I18N_PREFIX)) {
        throw new Error(`Key "${key}" does not start with "${I18N_PREFIX}".`);
      }

      const phrase = phrases[key];

      if (phrase) {
        if (message !== phrase.phrase) {
          throw new Error(`Key "${key}" found with different phrase messages.`);
        }

        if (context) {
          phrase.contexts.add(context);
        }
      } else {
        phrases[key] = {
          key,
          phrase: message,
          contexts: new Set(context ? [context] : []),
        };
      }
    };

    files.forEach(file => {
      if (file.endsWith('story.tsx')) {
        return;
      }

      parseAndTraverse(file, handleExtract);
    });

    return phrases;
  })
  .then(phrases => {
    console.log(`Found ${Object.keys(phrases).length} phrases`);

    const data = Object.values(phrases).map(row => ({
      key: row.key,
      phrase: row.phrase,
      contexts: Array.from(row.contexts),
    }));

    data.sort((a, b) => a.key.localeCompare(b.key));

    fs.writeFileSync('phrases.json', JSON.stringify(data, null, 2), 'utf8');

    console.log('Complete!');
  })
  .catch(error => {
    console.error(chalk.red(error));
  });
