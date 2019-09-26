/* eslint-disable no-param-reassign */

import { FileInfo, API, Options } from 'jscodeshift';
import { Codemod } from '../helpers';

function addBorderedProp(mod: Codemod, node) {
  const hasBorderedProp = node.openingElement.attributes.filter(
    attr =>
      attr.type === 'JSXAttribute' &&
      attr.name.type === 'JSXIdentifier' &&
      attr.name.name === 'bordered',
  );

  if (hasBorderedProp.length === 0) {
    const borderedProp = mod.createNode(cs => cs.jsxAttribute(cs.jsxIdentifier('bordered')));
    node.openingElement.attributes.push(borderedProp);
  }
}

function addBorderedPropToItems(mod: Codemod, name: string) {
  mod.source.find(mod.cs.JSXElement).forEach(({ node }) => {
    if (
      node.openingElement.name.type === 'JSXIdentifier' &&
      node.openingElement.name.name === name
    ) {
      addBorderedProp(mod, node);
    }
  });
}

function addBorderedPropToChildren(mod: Codemod, name: string) {
  mod.source.find(mod.cs.JSXElement).forEach(({ node }) => {
    if (
      node.openingElement.name.type === 'JSXIdentifier' &&
      node.openingElement.name.name === name
    ) {
      node.children.forEach(child => {
        if (
          child.type === 'JSXElement' &&
          child.openingElement.name.type === 'JSXIdentifier' &&
          child.openingElement.name.name === 'Item'
        ) {
          addBorderedProp(mod, child);
        }
      });
    }
  });
}

module.exports = function autocompleteProps(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  // Add `bordered` to `BorderedListItem`
  ['@airbnb/lunar/lib/components/BorderedList/Item'].forEach(importPath => {
    const compName = mod.getComponentNameFromDefaultImport(importPath);

    if (compName) {
      addBorderedPropToItems(mod, compName);
    }
  });

  // Add `bordered` to `Item` of `BorderedList`
  ['@airbnb/lunar/lib/components/BorderedList'].forEach(importPath => {
    const compName = mod.getComponentNameFromDefaultImport(importPath);

    if (compName) {
      addBorderedPropToChildren(mod, compName);
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
