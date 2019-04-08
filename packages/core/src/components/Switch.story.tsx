import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Switch from './Switch';

storiesOf('Core/Switch', module)
  .add('A standard switch field.', () => (
    <Switch name="switch-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('With an error message in an invalid state.', () => (
    <Switch
      name="switch-error"
      label="Label"
      onChange={action('onChange')}
      errorMessage="This field is required."
      invalid
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <Switch
      name="switch-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      disabled
    />
  ))
  .add('Marked as optional.', () => (
    <Switch name="switch-optional" label="Label" onChange={action('onChange')} optional />
  ))
  .add('Marked as checked in different states.', () => (
    <>
      <Switch name="switch-checked" label="Label" onChange={action('onChange')} checked />
      <Switch
        name="switch-checked-disabled"
        label="Label"
        onChange={action('onChange')}
        checked
        disabled
      />
      <Switch
        name="switch-checked-invalid"
        label="Label"
        onChange={action('onChange')}
        checked
        invalid
      />
    </>
  ));
