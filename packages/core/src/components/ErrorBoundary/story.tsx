import React from 'react';
import { action } from '@storybook/addon-actions';
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
    <ErrorBoundary onCatch={action('onCatch')}>
      <TestComponent />
    </ErrorBoundary>
  );
}

wrapsAndCatchesAnError.story = {
  name: 'Wraps and catches an error.',
};
