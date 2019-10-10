import React from 'react';
import Form from './Form';
import FileInput from './Form/FileInput';

export default {
  title: 'Forms/FileInput',
  parameters: {
    inspectComponents: [FileInput],
  },
};

export function connectedToTheParentForm() {
  return (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <FileInput name="field" label="Label" validator={() => {}} />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
