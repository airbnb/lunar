import React from 'react';
import Form from './Form';
import Input from './Form/Input';

export default {
  title: 'Forms/Input',
  parameters: {
    inspectComponents: [Input],
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
      <Input
        name="field"
        label="Label"
        validator={() => {}}
        onChange={() => console.log('onChange')}
      />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
