import React from 'react';
import ErrorBoundary from '.';

function TestComponent() {
  const error = new Error('This is the actual error message.');

  (error as any).error_id = 'weee';

  throw error;

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
