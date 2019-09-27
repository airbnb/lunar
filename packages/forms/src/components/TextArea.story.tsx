import React from 'react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import TextArea from './Form/TextArea';

export default {
  title: 'Forms/TextArea',
  parameters: {
    inspectComponents: [TextArea],
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
      <TextArea name="field" label="Label" validator={() => {}} />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
