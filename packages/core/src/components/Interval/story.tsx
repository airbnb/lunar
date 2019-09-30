import React from 'react';
import Text from '../Text';
import Interval from '.';

const start = Date.now();

export default {
  title: 'Core/Interval',
  parameters: {
    happo: false,
    inspectComponents: [Interval],
  },
};

export function reRendersAtAnInterval() {
  return (
    <Text>
      {/* A fast timer, to demonstrate the deferred scheduling */}
      <Interval every={100}>{now => <div>Interval last time: {now}</div>}</Interval>

      {/* A second timer */}
      <Interval every={1000}>
        {now => <div>Interval has been running for {Math.floor((now - start) / 1000)} seconds</div>}
      </Interval>
    </Text>
  );
}

reRendersAtAnInterval.story = {
  name: 'Re-renders at an interval.',
};
