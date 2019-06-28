import { FileInfo, API, Options } from 'jscodeshift';
import { Codemod } from '../helpers';

function renameOnLoadProp(mod: Codemod, name: string) {
  mod.source.find(mod.cs.JSXOpeningElement, { name: { name } }).forEach(({ node }) => {
    node.attributes.forEach(attr => {
      if (
        attr.type === 'JSXAttribute' &&
        attr.name.type === 'JSXIdentifier' &&
        attr.name.name === 'onLoadOptions'
      ) {
        attr.name.name = 'onLoadItems';
      }
    });
  });
}

module.exports = function autocompleteProps(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);

  // Rename `onLoadOptions` to `onLoadItems`
  [
    '@airbnb/lunar/lib/components/Autocomplete',
    '@airbnb/lunar/lib/components/Multicomplete',
    '@airbnb/lunar-forms/lib/components/Form/Autocomplete',
    '@airbnb/lunar-forms/lib/components/Form/Multicomplete',
  ].forEach(importPath => {
    const compName = mod.getComponentNameFromDefaultImport(importPath);

    if (compName) {
      renameOnLoadProp(mod, compName);
    }
  });

  mod
    .getComponentNameFromNamedImports('@airbnb/lunar-forms', ['Autocomplete', 'Multicomplete'])
    .forEach(compName => {
      renameOnLoadProp(mod, compName);
    });

  return mod.toSource(options);
};
