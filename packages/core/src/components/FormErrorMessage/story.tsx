import React from 'react';
import FormErrorMessage from '.';

export default {
  title: 'Core/FormErrorMessage',
  parameters: {
    inspectComponents: [FormErrorMessage],
  },
};

export function anErrorMessageForAnInvalidFormField() {
  return <FormErrorMessage id="foo" error="This field is required!" />;
}

anErrorMessageForAnInvalidFormField.story = {
  name: 'An error message for an invalid form field.',
};
