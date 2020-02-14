/* eslint-disable no-param-reassign */
// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemods/v3/internal/addStyleSheetProp.ts ./src

import { FileInfo, API, Options, TSTypeLiteral, Identifier } from 'jscodeshift';
import { Codemod } from '../../helpers';

function addPropToTypeAlias(mod: Codemod, obj: TSTypeLiteral) {
  const hasStyleSheetProp = obj.members.some(
    node =>
      node.type === 'TSPropertySignature' &&
      node.key.type === 'Identifier' &&
      node.key.name === 'styleSheet',
  );

  if (!hasStyleSheetProp) {
    const prop = mod.createNode(j =>
      j.tsPropertySignature(
        j.identifier('styleSheet'),
        j.tsTypeAnnotation(j.tsTypeReference(j.identifier('StyleSheet'))),
        true,
      ),
    );

    prop.comments = [mod.createNode(j => j.commentBlock('* Custom style sheet. ', true))];

    obj.members.push(prop);
  }
}

module.exports = function addStyleSheetProp(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  const imports = mod
    .findImports()
    .filter(({ node }) => String(node.source.value).endsWith('useStyles'));

  if (imports.length === 0) {
    return;
  }

  const useStylesImport = imports.nodes()[0];
  const component = mod.findReactComponent();

  if (!component) {
    return;
  }

  // Add `StyleSheet` named import
  const hasStyleSheetImport = useStylesImport.specifiers.some(
    node => node.type === 'ImportSpecifier' && node.local.name === 'StyleSheet',
  );

  if (!hasStyleSheetImport) {
    useStylesImport.specifiers.push(
      mod.createNode(j => j.importSpecifier(j.identifier('StyleSheet'))),
    );
  }

  // Add to `Props` type
  mod.source.find(mod.cs.TSTypeAliasDeclaration).forEach(({ node }) => {
    if (!node.id.name.endsWith('Props')) {
      return;
    }

    switch (node.typeAnnotation.type) {
      case 'TSTypeLiteral':
        addPropToTypeAlias(mod, node.typeAnnotation);
        break;

      case 'TSIntersectionType':
      case 'TSUnionType': {
        node.typeAnnotation.types.forEach(type => {
          if (type.type === 'TSTypeLiteral') {
            addPropToTypeAlias(mod, type);
          }
        });
        break;
      }
    }
  });

  // Add to `useStyles`
  mod.source.find(mod.cs.CallExpression, { callee: { name: 'useStyles' } }).forEach(({ node }) => {
    const arg = node.arguments[0] as Identifier;

    node.arguments[0] = mod.createNode(j =>
      j.logicalExpression('??', j.identifier('styleSheet'), arg),
    );
  });

  return mod.toSource({
    ...options,
    trailingComma: false,
  });
};
