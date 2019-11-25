import React from 'react';
import Form from './Form';
import CheckBox from './Form/CheckBox';

export default {
  title: 'Forms/CheckBox',
  parameters: {
    inspectComponents: [CheckBox],
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
      <CheckBox name="field" label="Label" validator={() => {}} onChange={action('onChange')} />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
