import React from 'react';
import Form from './Form';
import Switch from './Form/Switch';

export default {
  title: 'Forms/Switch',
  parameters: {
    inspectComponents: [Switch],
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
      <Switch
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
