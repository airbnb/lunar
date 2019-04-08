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
      Content before the loader. <Loader inline /> Content after the loader.
    </Text>
  ))
  .add('With a larger size positioned statically.', () => <Loader static large />);
