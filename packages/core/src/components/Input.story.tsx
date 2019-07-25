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
        name="input-small"
        label="Small"
        placeholder="Placeholder"
        onChange={action('onChange')}
        small
      />
      <Input
        name="input-regular"
        label="Regular"
        placeholder="Placeholder"
        onChange={action('onChange')}
      />
      <Input
        name="input-large"
        label="Large"
        placeholder="Placeholder"
        onChange={action('onChange')}
        large
      />
    </>
  ))
  .add('With an error message in an invalid state.', () => (
    <Input
      name="input-error"
      label="Label"
      onChange={action('onChange')}
      errorMessage="This field is required."
      invalid
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <Input
      name="input-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      disabled
    />
  ))
  .add('With a hidden label and password type.', () => (
    <Input
      name="input-custom"
      label="Label"
      onChange={action('onChange')}
      type="password"
      value="foobar"
      hideLabel
    />
  ))
  .add('Marked as optional.', () => (
    <Input name="input-optional" label="Label" onChange={action('onChange')} optional />
  ))
  .add('Display with inline label.', () => (
    <Input
      name="input-optional"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      optional
      inline
    />
  ));
