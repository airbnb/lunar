/* eslint-disable no-param-reassign */
// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemods/v3/i18nKeyContext.ts ./src

import { FileInfo, API, Options } from 'jscodeshift';
import { Codemod } from '../helpers';

module.exports = function i18nKeyContext(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  // <T />
  mod.source.find(mod.cs.JSXOpeningElement, { name: { name: 'T' } }).forEach(({ node }) => {
    // Remove context prop
    node.attributes = node.attributes.filter(attr => {
      if (
        attr.type === 'JSXAttribute' &&
        attr.name.type === 'JSXIdentifier' &&
        attr.name.name === 'context'
      ) {
        return false;
      }
      return true;
    });
  });

  // T.phrase()
  mod.source
    .find(mod.cs.CallExpression, {
      callee: { object: { name: 'T' }, property: { name: 'phrase' } },
    })
    .forEach(({ node }) => {
      const [phrase, params, opts] = node.arguments;
      let key = '';

      // Already converted
      if (phrase?.type === 'StringLiteral' && params?.type === 'StringLiteral') {
        return;
      }

      // Extract key and remove context
      if (opts && opts.type === 'ObjectExpression') {
        opts.properties = opts.properties.filter(prop => {
          if (prop.type === 'ObjectProperty' && prop.key.type === 'Identifier') {
            if (prop.key.name === 'context') {
              return false;
            }

            if (prop.key.name === 'key') {
              if (prop.value.type === 'StringLiteral') {
                key = prop.value.value;
              }

              return false;
            }
          }

          return true;
        });

        // No more properties in the object, so remove argument
        if (opts.properties.length === 0) {
          node.arguments.pop();
        }

        // Old context so remove
      } else if (opts && opts.type === 'StringLiteral') {
        node.arguments.pop();
      }

      // If params is falsy and theres no 3rd argument, remove it
      if (
        node.arguments.length === 2 &&
        (params.type === 'NullLiteral' ||
          (params.type === 'ObjectExpression' && params.properties.length === 0))
      ) {
        node.arguments.pop();
      }

      // Add key as the 1st argument
      if (key) {
        node.arguments.unshift(mod.createNode(cs => cs.stringLiteral(key)));
      } else {
        throw new Error(`T.phrase() found without a key: ${fileInfo.path}`);
      }
    });

  return mod.toSource(options);
};
