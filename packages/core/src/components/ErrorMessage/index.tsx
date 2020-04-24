import React from 'react';
import T from '../Translate';
import Alert from '../Alert';
import Spacing from '../Spacing';
import StatusText from '../StatusText';
import { ErrorType } from '../../types';
import Copy from '../Copy';
import StatusLabel from '../StatusLabel';

export function getErrorMessage(error: string | ErrorType, includeCode: boolean = false): string {
  if (typeof error === 'string') {
    return error;
  }

  const debug = error.debug_info;

  const message = debug
    ? `${debug.error_class} - ${debug.error_message || debug.response_message}`
    : error.user_message || error.error_details || error.error_message || (error as Error).message;

  if (includeCode && error.error_code) {
    return `${error.error_code} - ${message}`;
  }

  return message || '';
}

export type ErrorMessageProps = {
  /** An `Error` instance or an API endpoint response. */
  error?: ErrorType;
  /** Display the error inline as text. */
  inline?: boolean;
  /** Title of the error. Defaults to the error code or an unknown title. */
  title?: React.ReactNode;
  /** Subtitle of the error. Defaults to the message within `error`. */
  subtitle?: React.ReactNode;
  /** Callback fired when the alert is closed. */
  onClose?: () => void;
};

/** Display an error message from an `Error` instance or API endpoint. */
export default function ErrorMessage({
  error,
  inline,
  title,
  subtitle,
  onClose,
}: ErrorMessageProps) {
  if (!error) {
    return null;
  }

  const message = subtitle || getErrorMessage(error);
  const code = error.error_code || '';
  const errorID = error.error_id || '';
  const traceID = error.trace_id || '';

  if (inline) {
    return <StatusText danger>{message}</StatusText>;
  }

  return (
    <Alert
      danger
      title={
        title ||
        code || (
          <T k="lunar.error.featureCrashed" phrase="This feature has crashed or failed to load." />
        )
      }
      onClose={onClose}
    >
      {message}

      {errorID && (
        <Spacing top={1}>
          <StatusLabel compact>
            <T k="lunar.error.id" phrase="Error ID" />
          </StatusLabel>
          <StatusText inline bold muted micro>
            {errorID}
          </StatusText>
          <Copy text={errorID} />
        </Spacing>
      )}

      {traceID && (
        <Spacing top={1}>
          <StatusLabel compact>
            <T k="lunar.trace.id" phrase="Trace ID" />
          </StatusLabel>
          <StatusText inline bold muted micro>
            {traceID}
          </StatusText>
          <Copy text={traceID} />
        </Spacing>
      )}
    </Alert>
  );
}
