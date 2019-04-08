import React from 'react';
import { storiesOf } from '@storybook/react';
import ErrorMessage from './ErrorMessage';

storiesOf('Core/ErrorMessage', module)
  .add('With an `Error`.', () => (
    <ErrorMessage error={new Error('Something is broken!')} title="Oops" />
  ))
  .add('From an API endpoint error.', () => (
    <ErrorMessage
      error={{
        error_id: '123',
        error_code: 404,
        error_message: 'Resource not found.',
      }}
    />
  ));
