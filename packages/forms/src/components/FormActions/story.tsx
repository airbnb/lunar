import React from 'react';
import Form from '../Form';
import FormActions from '.';

export default {
  title: 'Forms/FormActions',
  parameters: {
    inspectComponents: [FormActions],
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
      <FormActions />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
