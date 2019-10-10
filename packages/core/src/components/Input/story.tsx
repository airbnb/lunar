import React from 'react';
import Input from '.';

export default {
  title: 'Core/Input',
  parameters: {
    inspectComponents: [Input],
  },
};

export function aStandardTextField() {
  return (
    <Input
      name="input-basic"
      label="Label"
      placeholder="Placeholder"
      onChange={action('onChange')}
    />
  );
}

aStandardTextField.story = {
  name: 'A standard text field.',
};

export function withDifferentSizingSmallDefaultOrLarge() {
  return (
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
  );
}

withDifferentSizingSmallDefaultOrLarge.story = {
  name: 'With different sizing: small, default or large.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
    <Input
      invalid
      name="input-error"
      label="Label"
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
    <Input
      disabled
      name="input-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  );
}

withALabelDescriptionInADisabledState.story = {
  name: 'With a label description in a disabled state.',
};

export function withAHiddenLabelAndPasswordType() {
  return (
    <Input
      hideLabel
      name="input-custom"
      label="Label"
      type="password"
      value="foobar"
      onChange={action('onChange')}
    />
  );
}

withAHiddenLabelAndPasswordType.story = {
  name: 'With a hidden label and password type.',
};

export function markedAsOptional() {
  return <Input optional name="input-optional" label="Label" onChange={action('onChange')} />;
}

markedAsOptional.story = {
  name: 'Marked as optional.',
};

export function displayWithInlineLabel() {
  return (
    <Input
      optional
      inline
      name="input-optional"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
    />
  );
}

displayWithInlineLabel.story = {
  name: 'Display with inline label.',
};
