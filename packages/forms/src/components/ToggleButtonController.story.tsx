import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ButtonGroup from '@airbnb/lunar/lib/components/ButtonGroup';
import Form from './Form';
import ToggleButtonController from './Form/ToggleButtonController';

storiesOf('Forms/ToggleButtonController', module)
  .addParameters({
    inspectComponents: [ToggleButtonController],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <ToggleButtonController name="field" label="Label" validator={() => {}}>
        {ControlledButton => (
          <ButtonGroup>
            <ControlledButton value="red" key="red">
              Red
            </ControlledButton>
            <ControlledButton value="blue" key="blue">
              Blue
            </ControlledButton>
            <ControlledButton value="green" key="green">
              Green
            </ControlledButton>
          </ButtonGroup>
        )}
      </ToggleButtonController>
    </Form>
  ));
