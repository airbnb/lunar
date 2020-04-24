import React from 'react';
import ErrorMessage from '.';
import { ErrorObject } from '../../types';

export default {
  title: 'Core/ErrorMessage',
  parameters: {
    inspectComponents: [ErrorMessage],
  },
};

export function withAnError() {
  return <ErrorMessage error={new Error('Something is broken!')} title="Oops" />;
}

withAnError.story = {
  name: 'With an `Error`.',
};

export function fromAnApiEndpointError() {
  return (
    <ErrorMessage
      error={{
        error_id: '123',
        error_code: 404,
        error_message: 'Resource not found.',
      }}
    />
  );
}

fromAnApiEndpointError.story = {
  name: 'From an API endpoint error.',
};

export function fromAnApiEndpointErrorWithTraceID() {
  // Would be shown for an APIError from airbnb-api-resource.
  const error = new Error('This is an error message.') as ErrorObject;
  error.trace_id = 'tRaDDDDS34534534qqqqqCeId==';

  return <ErrorMessage error={error} />;
}

fromAnApiEndpointErrorWithTraceID.story = {
  name: 'From an API endpoint error with Trace ID.',
};
