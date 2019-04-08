import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import ErrorBoundary from './ErrorBoundary';

function TestComponent() {
  throw new Error('This was thrown from a child.');

  // eslint-disable-next-line
  return null;
}

storiesOf('Core/ErrorBoundary', module).add('Wraps and catches an error.', () => (
  <ErrorBoundary onCatch={action('onCatch')}>
    <TestComponent />
  </ErrorBoundary>
));
