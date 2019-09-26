import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Input from './Input';

storiesOf('Core/Input', module)
  .addParameters({
    inspectComponents: [Input],
  })
  .add('A standard text field.', () => (
    <Input
      name="input-basic"
      label="Label"
      placeholder="Placeholder"
      onChange={action('onChange')}
    />
  ))
  .add('With different sizing: small, default or large.', () => (
    <>
      <Input
        small
        name="input-small"
        label="Small"
        placeholder="Placeholder"
        onChange={action('onChange')}
      />
      <Input
        name="input-regular"
        label="Regular"
        placeholder="Placeholder"
        onChange={action('onChange')}
      />
      <Input
        large
        name="input-large"
        label="Large"
        placeholder="Placeholder"
        onChange={action('onChange')}
      />
    </>
  ))
  .add('With an error message in an invalid state.', () => (
    <Input
      invalid
      name="input-error"
      label="Label"
      errorMessage="This field is required."
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <Input
      disabled
      name="input-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('With a hidden label and password type.', () => (
    <Input
      hideLabel
      name="input-custom"
      label="Label"
      type="password"
      value="foobar"
      onChange={action('onChange')}
    />
  ))
  .add('Marked as optional.', () => (
    <Input optional name="input-optional" label="Label" onChange={action('onChange')} />
  ))
  .add('Display with inline label.', () => (
    <Input
      optional
      inline
      name="input-optional"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ));
