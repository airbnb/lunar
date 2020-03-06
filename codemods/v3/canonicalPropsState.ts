/* eslint-disable no-param-reassign */
// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemods/v3/canonicalPropsState.ts ./src

import { FileInfo, API, Options } from 'jscodeshift';
import { Codemod } from '../helpers';

module.exports = function canonicalPropsState(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);
  const typeRenames: { [key: string]: string } = {};

  mod.source.find(mod.cs.ImportDeclaration).forEach(({ node }) => {
    const source = String(node.source.value);

    if (
      (!source.includes('lunar') && !source.includes('components')) ||
      source.endsWith('withIcon')
    ) {
      return;
    }

    const compName = (source.split('components/')[1] || '').replace(/\//, '');
    let defaultName = '';

    node.specifiers.forEach(spec => {
      if (spec.type === 'ImportDefaultSpecifier') {
        defaultName = spec.local.name;
      } else if (spec.type === 'ImportSpecifier') {
        const baseName = spec.imported.name;

        if (baseName === 'Props' || baseName === 'State') {
          const newName = (defaultName || compName).replace(/^Base/, '') + baseName;

          spec.imported.name = newName;

          if (spec.local.name === spec.imported.name) {
            delete spec.local;
          }

          typeRenames[newName] = baseName;
        }
      }
    });
  });

  mod.source.find(mod.cs.TSTypeReference).forEach(({ node }) => {
    Object.entries(typeRenames).forEach(([after, before]) => {
      if (node.typeName.type === 'Identifier' && node.typeName.name === before) {
        node.typeName.name = after;
      }
    });
  });

  return mod.toSource(options);
};
