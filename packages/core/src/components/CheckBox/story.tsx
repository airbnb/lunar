import React from 'react';
import CheckBox from '.';

export default {
  title: 'Core/CheckBox',
  parameters: {
    inspectComponents: [CheckBox],
  },
};

export function aStandardCheckboxField() {
  return <CheckBox name="cb-basic" label="Label" onChange={action('onChange')} />;
}

aStandardCheckboxField.story = {
  name: 'A standard checkbox field.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
    <CheckBox
      invalid
      name="cb-error"
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
    <CheckBox
      disabled
      name="cb-disabled"
      label="Label"
      labelDescription="This is a small label description."
      onChange={action('onChange')}
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
      onChange={action('onChange')}
    />
  );
}

withALabelDescriptionInAnIndeterminateState.story = {
  name: 'With a label description in an indeterminate state.',
};

export function withATopAlignment() {
  return (
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
  );
}

withATopAlignment.story = {
  name: 'With a top alignment.',
};

export function markedAsOptional() {
  return <CheckBox optional name="cb-optional" label="Label" onChange={action('onChange')} />;
}

markedAsOptional.story = {
  name: 'Marked as optional.',
};

export function markedAsCheckedInDifferentStates() {
  return (
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
      onChange={action('onChange')}
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
      compact
      name="cb-basic"
      label="Label"
      labelDescription="This is a label description."
      onChange={action('onChange')}
    />
  );
}

asACompactClickableButton.story = {
  name: 'As a compact, clickable button.',
};
