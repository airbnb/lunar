import React from 'react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import CheckBoxController from './Form/CheckBoxController';

export default {
  title: 'Forms/CheckBoxController',
  parameters: {
    inspectComponents: [CheckBoxController],
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
      <CheckBoxController name="field" label="Label" validator={() => {}}>
        {CheckBox => (
          <div>
            <CheckBox label="❤️ Red" value="red" />
            <CheckBox label="💙 Blue" value="blue" />
            <CheckBox label="💚 Green" value="green" />
          </div>
        )}
      </CheckBoxController>
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
