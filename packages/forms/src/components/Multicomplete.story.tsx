import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Form from './Form';
import Multicomplete from './Form/Multicomplete';

const items = [
  { value: 'red', name: 'Red' },
  { value: 'black', name: 'Black' },
  { value: 'blue', name: 'Blue' },
  { value: 'green', name: 'Green' },
];

storiesOf('Forms/Multicomplete', module)
  .addParameters({
    inspectComponents: [Multicomplete],
  })
  .add('Connected to the parent `Form`.', () => (
    <Form
      onSubmit={() => {
        action('onSubmit')();

        return Promise.resolve();
      }}
    >
      <Multicomplete
        name="field"
        label="Label"
        accessibilityLabel="Multicomplete"
        validator={() => {}}
        onLoadItems={value =>
          Promise.resolve(items.filter(item => item.name.toLowerCase().match(value.toLowerCase())))
        }
      />
    </Form>
  ));
