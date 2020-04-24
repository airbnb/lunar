import React from 'react';
import ErrorBoundary from '.';
import { ErrorObject } from '../..';

function TestComponent() {
  const error = new Error('This was thrown from a child.');
  (error as ErrorObject).error_id = '6db2d1a0275c97134535b4681914f8b6d';
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
