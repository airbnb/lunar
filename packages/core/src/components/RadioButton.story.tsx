import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import lunar from ':storybook/images/lunar-logo.png';
import RadioButton from './RadioButton';
import Row from './Row';
import ProfilePhoto from './ProfilePhoto';

storiesOf('Core/RadioButton', module)
  .addParameters({
    inspectComponents: [RadioButton],
  })
  .add('A standard radio button field.', () => (
    <RadioButton name="radio-basic" label="Label" value="foo" onChange={action('onChange')} />
  ))
  .add('With an error message in an invalid state.', () => (
    <RadioButton
      invalid
      name="radio-error"
      label="Label"
      value="foo"
      errorMessage="This field is required."
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in a disabled state.', () => (
    <RadioButton
      disabled
      name="radio-disabled"
      label="Label"
      value="foo"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('With a label description in a indeterminate state.', () => (
    <RadioButton
      indeterminate
      name="radio-neutral"
      label="Label"
      value="foo"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  ))
  .add('With a top alignment.', () => (
    <>
      <RadioButton
        checked
        topAlign
        name="radio-topalign"
        label="Label"
        value="foo"
        onChange={action('onChange')}
      />
      <RadioButton
        topAlign
        name="radio-topalign"
        label="Label"
        value="foo"
        labelDescription="This is a small label description."
        onChange={action('onChange')}
      />
    </>
  ))
  .add('Marked as optional.', () => (
    <RadioButton
      optional
      name="radio-optional"
      label="Label"
      value="foo"
      onChange={action('onChange')}
    />
  ))
  .add('Marked as checked in different states.', () => (
    <>
      <RadioButton
        checked
        name="radio-checked"
        label="Label"
        value="foo"
        onChange={action('onChange')}
      />
      <RadioButton
        checked
        disabled
        name="radio-checked-disabled"
        label="Label"
        value="foo"
        onChange={action('onChange')}
      />
      <RadioButton
        checked
        invalid
        name="radio-checked-invalid"
        label="Label"
        value="foo"
        onChange={action('onChange')}
      />
    </>
  ))
  .add('As a clickable button.', () => (
    <RadioButton
      button
      topAlign
      name="radio-basic"
      label="Label"
      labelDescription="This is a label description."
      value="foo"
      onChange={action('onChange')}
    />
  ))
  .add('As a compact, clickable button.', () => (
    <RadioButton
      button
      compact
      name="radio-basic"
      label="Label"
      labelDescription="This is a label description."
      value="foo"
      onChange={action('onChange')}
    >
      <Row after={<ProfilePhoto small imageSrc={lunar} title="Photo" />}>Label from children</Row>
    </RadioButton>
  ));
