import React from 'react';
import ErrorBoundary from '.';

function TestComponent() {
  throw new Error('This was thrown from a child.');

  // eslint-disable-next-line
  return null;
}

export default {
  title: 'Core/ErrorBoundary',
  parameters: {
    inspectComponents: [ErrorBoundary],
  },
};

export function wrapsAndCatchesAnError() {
  return (
    <ErrorBoundary onCatch={() => console.log('onCatch')}>
      <TestComponent />
    </ErrorBoundary>
  );
}

wrapsAndCatchesAnError.story = {
  name: 'Wraps and catches an error.',
};
