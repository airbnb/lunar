import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Select from './Select';

storiesOf('Core/Select', module)
  .add('A standard select field.', () => (
    <Select name="select-basic" label="Label" onChange={action('onChange')}>
      <option value="foo">Foo</option>
      <option value="bar" disabled>
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('With a compact smaller view.', () => (
    <>
      <Select name="select-compact" label="Compact" onChange={action('onChange')} compact>
        <option value="foo">Foo</option>
        <option value="bar" disabled>
          Bar
        </option>
        <option value="baz">Baz</option>
      </Select>

      <Select name="select-regular" label="Regular" onChange={action('onChange')}>
        <option value="foo">Foo</option>
        <option value="bar" disabled>
          Bar
        </option>
        <option value="baz">Baz</option>
      </Select>
    </>
  ))
  .add('With an error message in an invalid state.', () => (
    <Select
      name="select-error"
      label="Label"
      onChange={action('onChange')}
      errorMessage="This field is required."
      invalid
    >
      <option value="foo">Foo</option>
      <option value="bar" disabled>
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('With a label description in a disabled state.', () => (
    <Select
      name="select-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      disabled
    >
      <option value="foo">Foo</option>
      <option value="bar" disabled>
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('With a hidden label and a placeholder.', () => (
    <Select
      name="select-custom"
      label="Label"
      onChange={action('onChange')}
      hideLabel
      placeholder="Select an option"
    >
      <option value="foo">Foo</option>
      <option value="bar" disabled>
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('Marked as optional.', () => (
    <Select name="select-optional" label="Label" onChange={action('onChange')} optional>
      <option value="foo">Foo</option>
      <option value="bar" disabled>
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ))
  .add('Display with inline label.', () => (
    <Select name="select-optional" label="Label" onChange={action('onChange')} optional inline>
      <option value="foo">Foo</option>
      <option value="bar" disabled>
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  ));
