import React from 'react';
import { storiesOf } from '@storybook/react';
import Empty from '.';

storiesOf('Core/Empty', module)
  .addParameters({
    inspectComponents: [Empty],
  })
  .add('Empty state using a dash.', () => <Empty />);
