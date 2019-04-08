import React from 'react';
import { storiesOf } from '@storybook/react';
import Text from './Text';
import Interval from './Interval';

const start = Date.now();

storiesOf('Core/Interval', module).add('Re-renders at an interval.', () => (
  <Text>
    {/* A fast timer, to demonstrate the deferred scheduling */}
    <Interval every={100}>{now => <div>Interval last time: {now}</div>}</Interval>

    {/* A second timer */}
    <Interval every={1000}>
      {now => <div>Interval has been running for {Math.floor((now - start) / 1000)} seconds</div>}
    </Interval>
  </Text>
));
