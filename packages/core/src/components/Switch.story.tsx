import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Switch from './Switch';

storiesOf('Core/Switch', module)
  .addParameters({
    inspectComponents: [Switch],
  })
  .add('A standard switch field.', () => (
    <Switch name="switch-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('With an error message in an invalid state.', () => (
    <Switch
      invalid
      name="switch-error"
      label="Label"
      errorMessage="This field is required."
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <Switch
      disabled
      name="switch-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('Marked as optional.', () => (
    <Switch optional name="switch-optional" label="Label" onChange={action('onChange')} />
  ))
  .add('Marked as checked in different states.', () => (
    <>
      <Switch checked name="switch-checked" label="Label" onChange={action('onChange')} />
      <Switch
        checked
        disabled
        name="switch-checked-disabled"
        label="Label"
        onChange={action('onChange')}
      />
      <Switch
        checked
        invalid
        name="switch-checked-invalid"
        label="Label"
        onChange={action('onChange')}
      />
    </>
  ));
