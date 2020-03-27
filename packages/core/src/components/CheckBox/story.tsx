import React from 'react';
import CheckBox from '.';

export default {
  title: 'Core/CheckBox',
  parameters: {
    inspectComponents: [CheckBox],
  },
};

export function aStandardCheckboxField() {
  return (
    <>
      <CheckBox
        name="cb-basic"
        label="Label"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />
      <CheckBox
        checked
        name="cb-basic"
        label="Label when checked"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />
    </>
  );
}

aStandardCheckboxField.story = {
  name: 'A standard checkbox field.',
};

export function inDifferentSizes() {
  return (
    <>
      <CheckBox
        small
        middleAlign
        name="cb-small"
        label="Small"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />

      <CheckBox
        middleAlign
        name="cb-regular"
        label="Regular"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />

      <CheckBox
        large
        middleAlign
        name="cb-large"
        label="Large"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />
    </>
  );
}

inDifferentSizes.story = {
  name: 'In different sizes.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
    <CheckBox
      invalid
      name="cb-error"
      label="Label"
      errorMessage="This field is required."
      onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
    />
  );
}

withAnErrorMessageInAnInvalidState.story = {
  name: 'With an error message in an invalid state.',
};

export function withALabelDescriptionInADisabledState() {
  return (
    <CheckBox
      disabled
      name="cb-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
    />
  );
}

withALabelDescriptionInADisabledState.story = {
  name: 'With a label description in a disabled state.',
};

export function withALabelDescriptionInAnIndeterminateState() {
  return (
    <CheckBox
      indeterminate
      name="cb-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
    />
  );
}

withALabelDescriptionInAnIndeterminateState.story = {
  name: 'With a label description in an indeterminate state.',
};

export function withAMiddleAlignment() {
  return (
    <>
      <CheckBox
        checked
        middleAlign
        name="cb-topalign"
        label="Label"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />

      <CheckBox
        middleAlign
        name="cb-topalign"
        label="Label"
        labelDescription="This is a small label description."
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />
    </>
  );
}

withAMiddleAlignment.story = {
  name: 'With a middle alignment.',
};

export function markedAsOptional() {
  return (
    <CheckBox
      optional
      name="cb-optional"
      label="Label"
      onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
    />
  );
}

markedAsOptional.story = {
  name: 'Marked as optional.',
};

export function markedAsCheckedInDifferentStates() {
  return (
    <>
      <CheckBox
        checked
        name="cb-checked"
        label="Label"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />{' '}
      <CheckBox
        checked
        disabled
        name="cb-checked-disabled"
        label="Label"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />{' '}
      <CheckBox
        checked
        invalid
        name="cb-checked-invalid"
        label="Label"
        onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
      />
    </>
  );
}

markedAsCheckedInDifferentStates.story = {
  name: 'Marked as checked in different states.',
};

export function asAClickableButton() {
  return (
    <CheckBox
      button
      name="cb-basic"
      label="Label"
      labelDescription="This is a label description."
      onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
    />
  );
}

asAClickableButton.story = {
  name: 'As a clickable button.',
};

export function asACompactClickableButton() {
  return (
    <CheckBox
      button
      small
      name="cb-basic"
      label="Label"
      labelDescription="This is a label description."
      onChange={(checked) => console.log('onChange', `checked: ${checked}`)}
    />
  );
}

asACompactClickableButton.story = {
  name: 'As a compact, clickable button.',
};
