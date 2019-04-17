import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import Select from './Form/Select';

storiesOf('Forms/Select', module)
  .addParameters({
    inspectComponents: [Select],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <Select name="field" label="Label" validator={() => {}}>
        <option value="foo">Foo</option>
        <option value="bar">Bar</option>
        <option value="baz">Baz</option>
      </Select>
    </Form>
  ));
