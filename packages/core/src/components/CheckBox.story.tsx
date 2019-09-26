import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CheckBox from './CheckBox';

storiesOf('Core/CheckBox', module)
  .addParameters({
    inspectComponents: [CheckBox],
  })
  .add('A standard checkbox field.', () => (
    <CheckBox name="cb-basic" label="Label" onChange={action('onChange')} />
  ))
  .add('With an error message in an invalid state.', () => (
    <CheckBox
      invalid
      name="cb-error"
      label="Label"
      errorMessage="This field is required."
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <CheckBox
      disabled
      name="cb-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in an indeterminate state.', () => (
    <CheckBox
      indeterminate
      name="cb-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('With a top alignment.', () => (
    <>
      <CheckBox checked topAlign name="cb-topalign" label="Label" onChange={action('onChange')} />
      <CheckBox
        topAlign
        name="cb-topalign"
        label="Label"
        labelDescription="This is a small label description."
        onChange={action('onChange')}
      />
    </>
  ))
  .add('Marked as optional.', () => (
    <CheckBox optional name="cb-optional" label="Label" onChange={action('onChange')} />
  ))
  .add('Marked as checked in different states.', () => (
    <>
      <CheckBox checked name="cb-checked" label="Label" onChange={action('onChange')} />{' '}
      <CheckBox
        checked
        disabled
        name="cb-checked-disabled"
        label="Label"
        onChange={action('onChange')}
      />{' '}
      <CheckBox
        checked
        invalid
        name="cb-checked-invalid"
        label="Label"
        onChange={action('onChange')}
      />
    </>
  ))
  .add('As a clickable button.', () => (
    <CheckBox
      button
      name="cb-basic"
      label="Label"
      labelDescription="This is a label description."
      onChange={action('onChange')}
    />
  ))
  .add('As a compact, clickable button.', () => (
    <CheckBox
      button
      compact
      name="cb-basic"
      label="Label"
      labelDescription="This is a label description."
      onChange={action('onChange')}
    />
  ));
