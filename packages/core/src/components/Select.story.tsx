import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Select from './Select';

storiesOf('Core/Select', module)
  .addParameters({
    inspectComponents: [Select],
  })
  .add('A standard select field.', () => (
    <Select name="select-basic" label="Label" onChange={action('onChange')}>
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('With a compact smaller view.', () => (
    <>
      <Select compact name="select-compact" label="Compact" onChange={action('onChange')}>
        <option value="foo">Foo</option>
        <option disabled value="bar">
          Bar
        </option>
        <option value="baz">Baz</option>
      </Select>

      <Select name="select-regular" label="Regular" onChange={action('onChange')}>
        <option value="foo">Foo</option>
        <option disabled value="bar">
          Bar
        </option>
        <option value="baz">Baz</option>
      </Select>
    </>
  ))
  .add('With an error message in an invalid state.', () => (
    <Select
      invalid
      name="select-error"
      label="Label"
      errorMessage="This field is required."
      onChange={action('onChange')}
    >
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('With a label description in a disabled state.', () => (
    <Select
      disabled
      name="select-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    >
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('With a hidden label and a placeholder.', () => (
    <Select
      hideLabel
      name="select-custom"
      label="Label"
      placeholder="Select an option"
      onChange={action('onChange')}
    >
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('Marked as optional.', () => (
    <Select optional name="select-optional" label="Label" onChange={action('onChange')}>
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('Display with inline label.', () => (
    <Select optional inline name="select-optional" label="Label" onChange={action('onChange')}>
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ));
