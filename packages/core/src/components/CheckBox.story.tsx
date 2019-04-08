import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CheckBox from './CheckBox';

storiesOf('Core/CheckBox', module)
  .add('A standard checkbox field.', () => (
    <CheckBox name="cb-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('With an error message in an invalid state.', () => (
    <CheckBox
      name="cb-error"
      label="Label"
      onChange={action('onChange')}
      errorMessage="This field is required."
      invalid
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <CheckBox
      name="cb-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      disabled
    />
  ))
  .add('With a top alignment.', () => (
    <CheckBox
      topAlign
      name="cb-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('Marked as optional.', () => (
    <CheckBox name="cb-optional" label="Label" onChange={action('onChange')} optional />
  ))
  .add('Marked as checked in different states.', () => (
    <>
      <CheckBox name="cb-checked" label="Label" onChange={action('onChange')} checked />{' '}
      <CheckBox
        name="cb-checked-disabled"
        label="Label"
        onChange={action('onChange')}
        checked
        disabled
      />{' '}
      <CheckBox
        name="cb-checked-invalid"
        label="Label"
        onChange={action('onChange')}
        checked
        invalid
      />
    </>
  ))
  .add('As a large clickable button.', () => (
    <CheckBox
      name="cb-basic"
      label="Label"
      labelDescription="This is a label description."
      onChange={action('onChange')}
      button
    />
  ));
