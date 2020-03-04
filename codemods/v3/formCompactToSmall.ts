/* eslint-disable no-param-reassign */
// npx jscodeshift --extensions=js,jsx,ts,tsx --parser=tsx --transform=./codemods/v3/formCompactToSmall.ts ./src

import { FileInfo, API, Options } from 'jscodeshift';
import { Codemod } from '../helpers';

function convertCompactToSmall(mod: Codemod, name: string) {
  mod.source.find(mod.cs.JSXOpeningElement, { name: { name } }).forEach(({ node }) => {
    node.attributes.forEach(attr => {
      if (attr.type === 'JSXAttribute' && attr.name.name === 'compact') {
        attr.name.name = 'small';
      }
    });
  });
}

module.exports = function formCompactToSmall(
  fileInfo: FileInfo,
  api: API,
  options: Options,
): string | null | undefined | void {
  const mod = new Codemod(fileInfo, api);
  const inputTypes = [
    'Autocomplete',
    'CheckBox',
    'CheckBoxController',
    'DatePickerInput',
    'DateTimeSelect',
    'FileInput',
    'FormField',
    'FormField/Prefix',
    'FormField/Suffix',
    'Input',
    'Multicomplete',
    'RadioButton',
    'RadioButtonController',
    'Select',
    'Switch',
    'TextArea',
    'ToggleButtonController',
  ];

  // Full path imports
  ['@airbnb/lunar/lib/components', '@airbnb/lunar-forms/lib/components'].forEach(importPath => {
    inputTypes.forEach(type => {
      const compName = mod.getComponentNameFromDefaultImport(`${importPath}/${type}`);

      if (compName) {
        convertCompactToSmall(mod, compName);
      }
    });
  });

  // Named forms imports
  inputTypes.forEach(type => {
    mod
      .getComponentNameFromNamedImports('@airbnb/lunar-forms', [type])
      .forEach(compName => convertCompactToSmall(mod, compName));
  });

  // Prefix and suffix imports
  mod
    .getComponentNameFromNamedImports('@airbnb/lunar/lib/components/FormField', [
      'Prefix',
      'Suffix',
    ])
    .forEach(compName => convertCompactToSmall(mod, compName));

  return mod.toSource(options);
};
