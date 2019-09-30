import React from 'react';
import { action } from '@storybook/addon-actions';
import lunar from ':storybook/images/lunar-logo.png';
import RadioButton from '.';
import Row from '../Row';
import ProfilePhoto from '../ProfilePhoto';

export default {
  title: 'Core/RadioButton',
  parameters: {
    inspectComponents: [RadioButton],
  },
};

export function aStandardRadioButtonField() {
  return <RadioButton name="radio-basic" label="Label" value="foo" onChange={action('onChange')} />;
}

aStandardRadioButtonField.story = {
  name: 'A standard radio button field.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
    <RadioButton
      invalid
      name="radio-error"
      label="Label"
      value="foo"
      errorMessage="This field is required."
      onChange={action('onChange')}
    />
  );
}

withAnErrorMessageInAnInvalidState.story = {
  name: 'With an error message in an invalid state.',
};

export function withALabelDescriptionInADisabledState() {
  return (
    <RadioButton
      disabled
      name="radio-disabled"
      label="Label"
      value="foo"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  );
}

withALabelDescriptionInADisabledState.story = {
  name: 'With a label description in a disabled state.',
};

export function withALabelDescriptionInAIndeterminateState() {
  return (
    <RadioButton
      indeterminate
      name="radio-neutral"
      label="Label"
      value="foo"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  );
}

withALabelDescriptionInAIndeterminateState.story = {
  name: 'With a label description in a indeterminate state.',
};

export function withATopAlignment() {
  return (
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
  );
}

withATopAlignment.story = {
  name: 'With a top alignment.',
};

export function markedAsOptional() {
  return (
    <RadioButton
      optional
      name="radio-optional"
      label="Label"
      value="foo"
      onChange={action('onChange')}
    />
  );
}

markedAsOptional.story = {
  name: 'Marked as optional.',
};

export function markedAsCheckedInDifferentStates() {
  return (
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
  );
}

markedAsCheckedInDifferentStates.story = {
  name: 'Marked as checked in different states.',
};

export function asAClickableButton() {
  return (
    <RadioButton
      button
      topAlign
      name="radio-basic"
      label="Label"
      labelDescription="This is a label description."
      value="foo"
      onChange={action('onChange')}
    />
  );
}

asAClickableButton.story = {
  name: 'As a clickable button.',
};

export function asACompactClickableButton() {
  return (
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
  );
}

asACompactClickableButton.story = {
  name: 'As a compact, clickable button.',
};
