import * as form from '../src';

describe('forms', () => {
  it('re-exports all components', () => {
    expect(Object.keys(form)).toEqual([
      '__esModule',
      'default',
      'Autocomplete',
      'CheckBox',
      'CheckBoxController',
      'DatePickerInput',
      'DateTimeSelect',
      'FormActions',
      'FormContext',
      'FileInput',
      'Input',
      'Multicomplete',
      'RadioButtonController',
      'Select',
      'Switch',
      'TextArea',
      'ToggleButtonController',
    ]);
  });
});
