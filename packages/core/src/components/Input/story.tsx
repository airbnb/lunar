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
      onChange={() => console.log('onChange')}
    />
  );
}

aStandardTextField.story = {
  name: 'A standard text field.',
};

export function inDifferentSizes() {
  return (
    <>
      <Input
        small
        name="input-small"
        label="Small"
        placeholder="Placeholder"
        onChange={() => console.log('onChange')}
      />
      <Input
        name="input-regular"
        label="Regular"
        placeholder="Placeholder"
        onChange={() => console.log('onChange')}
      />
      <Input
        large
        name="input-large"
        label="Large"
        placeholder="Placeholder"
        onChange={() => console.log('onChange')}
      />
    </>
  );
}

inDifferentSizes.story = {
  name: 'In different sizes.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
    <Input
      invalid
      name="input-error"
      label="Label"
      errorMessage="This field is required."
      onChange={() => console.log('onChange')}
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
      onChange={() => console.log('onChange')}
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
      onChange={() => console.log('onChange')}
    />
  );
}

withAHiddenLabelAndPasswordType.story = {
  name: 'With a hidden label and password type.',
};

export function markedAsOptional() {
  return (
    <Input optional name="input-optional" label="Label" onChange={() => console.log('onChange')} />
  );
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
      onChange={() => console.log('onChange')}
    />
  );
}

displayWithInlineLabel.story = {
  name: 'Display with inline label.',
};
