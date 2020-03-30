import React from 'react';
import Form from './Form';
import Select from './Form/Select';

export default {
  title: 'Forms/Select',
  parameters: {
    inspectComponents: [Select],
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
      <Select
        name="field"
        label="Label"
        validator={() => {}}
        onChange={() => console.log('onChange')}
      >
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="baz">Baz</option>
      </Select>
    </Form>
  );
}

connectedToTheParentForm.story = {
  name: 'Connected to the parent `Form`.',
};
