import React from 'react';
import { action } from '@storybook/addon-actions';
import Select from '.';

export default {
  title: 'Core/Select',
  parameters: {
    inspectComponents: [Select],
  },
};

export function aStandardSelectField() {
  return (
    <Select name="select-basic" label="Label" onChange={action('onChange')}>
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  );
}

aStandardSelectField.story = {
  name: 'A standard select field.',
};

export function withACompactSmallerView() {
  return (
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
  );
}

withACompactSmallerView.story = {
  name: 'With a compact smaller view.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
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
  );
}

withAnErrorMessageInAnInvalidState.story = {
  name: 'With an error message in an invalid state.',
};

export function withALabelDescriptionInADisabledState() {
  return (
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
  );
}

withALabelDescriptionInADisabledState.story = {
  name: 'With a label description in a disabled state.',
};

export function withAHiddenLabelAndAPlaceholder() {
  return (
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
  );
}

withAHiddenLabelAndAPlaceholder.story = {
  name: 'With a hidden label and a placeholder.',
};

export function markedAsOptional() {
  return (
    <Select optional name="select-optional" label="Label" onChange={action('onChange')}>
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  );
}

markedAsOptional.story = {
  name: 'Marked as optional.',
};

export function displayWithInlineLabel() {
  return (
    <Select optional inline name="select-optional" label="Label" onChange={action('onChange')}>
      <option value="foo">Foo</option>
      <option disabled value="bar">
        Bar
      </option>
      <option value="baz">Baz</option>
    </Select>
  );
}

displayWithInlineLabel.story = {
  name: 'Display with inline label.',
};
