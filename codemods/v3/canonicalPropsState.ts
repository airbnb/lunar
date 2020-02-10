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

  mod.source.find(mod.cs.ImportDeclaration).forEach(({ node }) => {
    const source = String(node.source.value);

    if (!source.includes('components')) {
      return;
    }

    const compName = source.split('components/')[1].replace(/\//, '');
    let defaultName = '';

    node.specifiers.forEach(spec => {
      if (spec.type === 'ImportDefaultSpecifier') {
        defaultName = spec.local.name;
      } else if (spec.type === 'ImportSpecifier') {
        const baseName = spec.imported.name;

        if (baseName === 'Props' || baseName === 'State') {
          spec.imported.name = (defaultName || compName) + spec.imported.name;
        }
      }
    });
  });

  return mod.toSource(options);
};
