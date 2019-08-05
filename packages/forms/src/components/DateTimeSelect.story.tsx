import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import DateTimeSelect from './Form/DateTimeSelect';

const fixedDate = new Date(2019, 1, 1, 10, 10, 10);

storiesOf('Forms/DateTimeSelect', module)
  .addParameters({
    inspectComponents: [DateTimeSelect],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <DateTimeSelect
        name="field"
        label="Label"
        validator={() => {}}
        defaultValue={fixedDate.toISOString()}
      />
    </Form>
  ));
