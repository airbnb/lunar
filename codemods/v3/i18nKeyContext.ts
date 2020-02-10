/* eslint-disable no-param-reassign */
// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=babel --transform=./codemods/v3/i18nKeyContext.ts ./src

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
    .find(mod.cs.CallExpression, { object: { name: 'T' }, property: { name: 'phrase' } })
    .forEach(({ node }) => {
      const opts = node.arguments[2];
      let key = '';

      // Extract key from 3rd argument object
      if (opts && opts.type === 'ObjectExpression') {
        console.log(opts);
        opts.properties = opts.properties.filter(prop => {
          if (
            prop.type === 'ObjectProperty' &&
            prop.key.type === 'Identifier' &&
            prop.key.name === 'key'
          ) {
            // key = prop.value.value;

            return false;
          }

          return true;
        });
      }
    });

  return mod.toSource(options);
};
