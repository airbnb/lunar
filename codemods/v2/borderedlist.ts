/* eslint-disable no-param-reassign */
import { FileInfo, API, Options } from 'jscodeshift';
import { Codemod } from '../helpers';

module.exports = function autocompleteProps(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  mod.source.find(mod.cs.JSXElement).forEach(({ node }) => {
    if (
      node.openingElement.name.type === 'JSXIdentifier' &&
      node.openingElement.name.name === 'BorderedList'
    ) {
      node.children.forEach(child => {
        if (
          child.type === 'JSXElement' &&
          child.openingElement.name.type === 'JSXIdentifier' &&
          child.openingElement.name.name === 'Item'
        ) {
          const borderedProp = mod.createNode(cs => cs.jsxAttribute(cs.jsxIdentifier('bordered')));
          child.openingElement.attributes.push(borderedProp);
        }
      });

      node.openingElement.name.name = 'List';
    }

    if (
      node.closingElement &&
      node.closingElement.name.type === 'JSXIdentifier' &&
      node.closingElement.name.name === 'BorderedList'
    ) {
      node.closingElement.name.name = 'List';
    }
  });

  mod.source.find(mod.cs.ImportDefaultSpecifier).forEach(({ node }) => {
    if (node.local.type === 'Identifier' && node.local.name === 'BorderedList') {
      node.local.name = 'List';
    } else if (node.local.type === 'Identifier' && node.local.name === 'BorderedListItem') {
      node.local.name = 'ListItem';
    }
  });

  mod.source.find(mod.cs.StringLiteral).forEach(({ node }) => {
    if (node.value.includes('BorderedList')) {
      node.value = node.value.replace('BorderedList', 'List');
    } else if (node.value.includes('BorderedListItem')) {
      node.value = node.value.replace('BorderedListItem', 'ListItem');
    }
  });

  mod.source.find(mod.cs.Identifier).forEach(({ node }) => {
    if (node.name === 'BorderedList') {
      node.name = 'List';
    } else if (node.name === 'BorderedListItem') {
      node.name = 'ListItem';
    }
  });

  return mod.toSource(options);
};
