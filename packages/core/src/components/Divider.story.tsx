import React from 'react';
import { storiesOf } from '@storybook/react';
import Divider from './Divider';

storiesOf('Core/Divider', module)
  .addParameters({
    inspectComponents: [Divider],
  })
  .add('Standard divider.', () => <Divider />)
  .add('Short divider.', () => <Divider short />);
