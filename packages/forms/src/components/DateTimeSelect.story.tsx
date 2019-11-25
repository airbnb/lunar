import React from 'react';
import Form from './Form';
import DateTimeSelect from './Form/DateTimeSelect';

const fixedDate = new Date(2019, 1, 1, 10, 10, 10);

export default {
  title: 'Forms/DateTimeSelect',
  parameters: {
    inspectComponents: [DateTimeSelect],
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
      <DateTimeSelect
        name="field"
        label="Label"
        validator={() => {}}
        defaultValue={fixedDate.toISOString()}
        onChange={action('onChange')}
      />
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
