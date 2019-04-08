import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import Loader from './Loader';

storiesOf('Core/Loader', module)
  .add('A loader absolutely centered within a parent.', () => (
    <div style={{ height: 100, position: 'relative' }}>
      <Loader />
    </div>
  ))
  .add('A loader inline.', () => (
    <Text>
      Lorem ipsum. <Loader inline /> Dolor sit amet.
    </Text>
  ))
  .add('With a larger size positioned statically.', () => <Loader static large />);
