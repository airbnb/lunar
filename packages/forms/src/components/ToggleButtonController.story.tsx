import React from 'react';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import Form from './Form';
import ToggleButtonController from './Form/ToggleButtonController';

export default {
  title: 'Forms/ToggleButtonController',
  parameters: {
    inspectComponents: [ToggleButtonController],
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
      <ToggleButtonController
        name="field"
        label="Label"
        validator={() => {}}
        onChange={action('onChange')}
      >
        {ControlledButton => (
          <ButtonGroup>
            <ControlledButton key="red" value="red">
              Red
            </ControlledButton>
            <ControlledButton key="blue" value="blue">
              Blue
            </ControlledButton>
            <ControlledButton key="green" value="green">
              Green
            </ControlledButton>
          </ButtonGroup>
        )}
      </ToggleButtonController>
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
