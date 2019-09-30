import React from 'react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import RadioButtonController from './Form/RadioButtonController';

export default {
  title: 'Forms/RadioButtonController',
  parameters: {
    inspectComponents: [RadioButtonController],
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
      <RadioButtonController name="field" label="Label" validator={() => {}}>
        {RadioButton => (
          <div>
            <RadioButton label="❤️ Red" value="red" />
            <RadioButton label="💙 Blue" value="blue" />
            <RadioButton label="💚 Green" value="green" />
          </div>
        )}
      </RadioButtonController>
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
