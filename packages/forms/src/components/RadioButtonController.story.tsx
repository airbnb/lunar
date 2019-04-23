import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import RadioButtonController from './Form/RadioButtonController';

storiesOf('Forms/RadioButtonController', module)
  .addParameters({
    inspectComponents: [RadioButtonController],
  })
  .add('Connected to the parent `Form`.', () => (
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
  ));
