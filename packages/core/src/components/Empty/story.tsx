import React from 'react';
import Empty from '.';

export default {
  title: 'Core/Empty',
  parameters: {
    inspectComponents: [Empty],
  },
};

export function emptyStateUsingADash() {
  return <Empty />;
}

emptyStateUsingADash.story = {
  name: 'Empty state using a dash.',
};
