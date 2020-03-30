import React from 'react';
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
  return (
    <>
      <RadioButton
        name="radio-basic-basic"
        label="Label"
        value="basic"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />

      <RadioButton
        checked
        name="radio-basic-checked"
        label="Label when checked"
        value="checked"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />
    </>
  );
}

aStandardRadioButtonField.story = {
  name: 'A standard radio button field.',
};

export function inDifferentSizes() {
  return (
    <>
      <RadioButton
        small
        middleAlign
        name="radio-small"
        label="Small"
        value="small"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />
      <RadioButton
        middleAlign
        name="radio-regular"
        label="Regular"
        value="regular"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />
      <RadioButton
        large
        middleAlign
        name="radio-large"
        label="Large"
        value="large"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />
    </>
  );
}

inDifferentSizes.story = {
  name: 'In different sizes.',
};

export function withAnErrorMessageInAnInvalidState() {
  return (
    <RadioButton
      invalid
      name="radio-error"
      label="Label"
      value="error"
      errorMessage="This field is required."
      onChange={(checked, value) =>
        console.log('onChange', `checked: ${checked}`, `value: ${value}`)
      }
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
      value="disabled"
      labelDescription="This is a small label description."
      onChange={(checked, value) =>
        console.log('onChange', `checked: ${checked}`, `value: ${value}`)
      }
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
      value="neutral"
      labelDescription="This is a small label description."
      onChange={(checked, value) =>
        console.log('onChange', `checked: ${checked}`, `value: ${value}`)
      }
    />
  );
}

withALabelDescriptionInAIndeterminateState.story = {
  name: 'With a label description in a indeterminate state.',
};

export function withAMiddleAlignment() {
  return (
    <>
      <RadioButton
        checked
        middleAlign
        name="radio-topalign"
        label="Label"
        value="topalign"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />
      <RadioButton
        middleAlign
        name="radio-middlealign"
        label="Label"
        value="middlealign"
        labelDescription="This is a small label description."
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />
    </>
  );
}

withAMiddleAlignment.story = {
  name: 'With a middle alignment.',
};

export function markedAsOptional() {
  return (
    <RadioButton
      optional
      name="radio-optional"
      label="Label"
      value="optional"
      onChange={(checked, value) =>
        console.log('onChange', `checked: ${checked}`, `value: ${value}`)
      }
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
        value="checked"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />
      <RadioButton
        checked
        disabled
        name="radio-checked-disabled"
        label="Label"
        value="checked-disabled"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
      />
      <RadioButton
        checked
        invalid
        name="radio-checked-invalid"
        label="Label"
        value="checked-invalid"
        onChange={(checked, value) =>
          console.log('onChange', `checked: ${checked}`, `value: ${value}`)
        }
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
      middleAlign
      name="radio-basic"
      label="Label"
      labelDescription="This is a label description."
      value="basic"
      onChange={(checked, value) =>
        console.log('onChange', `checked: ${checked}`, `value: ${value}`)
      }
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
      small
      name="radio-basic"
      label="Label"
      labelDescription="This is a label description."
      value="basic"
      onChange={(checked, value) =>
        console.log('onChange', `checked: ${checked}`, `value: ${value}`)
      }
    >
      <Row after={<ProfilePhoto small imageSrc={lunar} title="Photo" />}>Label from children</Row>
    </RadioButton>
  );
}

asACompactClickableButton.story = {
  name: 'As a small clickable button.',
};
