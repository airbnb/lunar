import React from 'react';
import Switch from '.';

export default {
  title: 'Core/Switch',
  parameters: {
    inspectComponents: [Switch],
  },
};

export function aStandardSwitchField() {
  return <Switch name="switch-basic" label="Label" onChange={() => console.log('onChange')} />;
}

aStandardSwitchField.story = {
  name: 'A standard switch field.',
};

export function inDifferentSizes() {
  return (
    <>
      <Switch small name="switch-small" label="Small" onChange={() => console.log('onChange')} />
      <Switch name="switch-regular" label="Regular" onChange={() => console.log('onChange')} />
      <Switch large name="switch-large" label="Large" onChange={() => console.log('onChange')} />
    </>
  );
}

inDifferentSizes.story = {
  name: 'In different sizes.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
    <Switch
      invalid
      name="switch-error"
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
    <Switch
      disabled
      name="switch-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={() => console.log('onChange')}
    />
  );
}

withALabelDescriptionInADisabledState.story = {
  name: 'With a label description in a disabled state.',
};

export function markedAsOptional() {
  return (
    <Switch
      optional
      name="switch-optional"
      label="Label"
      onChange={() => console.log('onChange')}
    />
  );
}

markedAsOptional.story = {
  name: 'Marked as optional.',
};

export function markedAsCheckedInDifferentStates() {
  return (
    <>
      <Switch
        checked
        name="switch-checked"
        label="Label"
        onChange={() => console.log('onChange')}
      />
      <Switch
        checked
        disabled
        name="switch-checked-disabled"
        label="Label"
        onChange={() => console.log('onChange')}
      />
      <Switch
        checked
        invalid
        name="switch-checked-invalid"
        label="Label"
        onChange={() => console.log('onChange')}
      />
    </>
  );
}

markedAsCheckedInDifferentStates.story = {
  name: 'Marked as checked in different states.',
};
