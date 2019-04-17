import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import CheckBoxController from './Form/CheckBoxController';

storiesOf('Forms/CheckBoxController', module)
  .addParameters({
    inspectComponents: [CheckBoxController],
  })
  .add('Connected to the parent `Form`.', () => (
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
  ));
