import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import RadioButton from './RadioButton';

storiesOf('Core/RadioButton', module)
  .add('A standard radio button field.', () => (
    <RadioButton name="radio-basic" label="Label" value="foo" onChange={action('onChange')} />
  ))
  .add('With an error message in an invalid state.', () => (
    <RadioButton
      name="radio-error"
      label="Label"
      value="foo"
      onChange={action('onChange')}
      errorMessage="This field is required."
      invalid
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <RadioButton
      name="radio-disabled"
      label="Label"
      value="foo"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
      disabled
    />
  ))
  .add('With a top alignment.', () => (
    <RadioButton
      topAlign
      name="radio-disabled"
      label="Label"
      value="foo"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('Marked as optional.', () => (
    <RadioButton
      name="radio-optional"
      label="Label"
      value="foo"
      onChange={action('onChange')}
      optional
    />
  ))
  .add('Marked as checked in different states.', () => (
    <>
      <RadioButton
        name="radio-checked"
        label="Label"
        value="foo"
        onChange={action('onChange')}
        checked
      />
      <RadioButton
        name="radio-checked-disabled"
        label="Label"
        value="foo"
        onChange={action('onChange')}
        checked
        disabled
      />
      <RadioButton
        name="radio-checked-invalid"
        label="Label"
        value="foo"
        onChange={action('onChange')}
        checked
        invalid
      />
    </>
  ))
  .add('As a large clickable button.', () => (
    <RadioButton
      name="radio-basic"
      label="Label"
      labelDescription="This is a label description."
      value="foo"
      onChange={action('onChange')}
      button
    />
  ));
