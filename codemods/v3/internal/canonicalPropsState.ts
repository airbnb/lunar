/* eslint-disable no-param-reassign */
// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemods/v3/internal/canonicalPropsState.ts ./src

import { FileInfo, API, Options } from 'jscodeshift';
import { Codemod } from '../../helpers';

function renameType(mod: Codemod, baseName: string, compName: string) {
  const newName = compName + baseName;

  // Rename type aliases
  mod.source.find(mod.cs.TSTypeAliasDeclaration, { id: { name: baseName } }).forEach(({ node }) => {
    node.id.name = newName;
  });

  // Rename generics
  mod.source.find(mod.cs.TSTypeReference, { typeName: { name: baseName } }).forEach(({ node }) => {
    if (node.typeName.type === 'Identifier') {
      node.typeName.name = newName;
    }
  });
}

module.exports = function canonicalPropsState(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  if (!fileInfo.path.endsWith('.tsx') || fileInfo.path.includes('composers')) {
    return;
  }

  const component = mod.findReactComponent();

  if (!component) {
    return;
  }

  const compName = component.id.name;

  renameType(mod, 'Props', compName);
  renameType(mod, 'State', compName);

  return mod.toSource(options);
};
