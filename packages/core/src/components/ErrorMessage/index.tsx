import React from 'react';
import T from '../Translate';
import Alert from '../Alert';
import MutedButton from '../MutedButton';
import Spacing from '../Spacing';
import StatusText from '../StatusText';
import { ErrorType } from '../../types';
import Core from '../..';

export function getErrorMessage(error: any, includeCode: boolean = false): string {
  const debug = error.debug_info;

  const message = debug
    ? `${debug.error_class} - ${debug.error_message || debug.response_message}`
    : error.user_message || error.error_details || error.error_message || error.message;

  if (includeCode && error.error_code) {
    return `${error.error_code} - ${message}`;
  }

  return message || '';
}

/* istanbul ignore next */
function createRedirectURL(id: string, url?: string) {
  return () => window.open(url || Core.settings.errorURL.replace('{{id}}', id), '_blank');
}

export type Props = {
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
export default class ErrorMessage extends React.PureComponent<Props> {
  static defaultProps = {
    inline: false,
    subtitle: null,
    title: null,
  };

  render() {
    const { error, inline, title, subtitle, onClose } = this.props;

    if (!error) {
      return null;
    }

    const message = subtitle || getErrorMessage(error);
    const code = error instanceof Error ? null : error.error_code;
    const id = error instanceof Error ? null : error.error_id;
    const url = error instanceof Error ? '' : error.error_url;

    if (inline) {
      return <StatusText danger>{message}</StatusText>;
    }

    return (
      <Alert
        danger
        title={
          title ||
          code || <T phrase="Unknown error" context="Title for an unknown error occurred" />
        }
        onClose={onClose}
      >
        {message}

        {id && (
          <Spacing top={1}>
            <MutedButton inverted onClick={createRedirectURL(id, url)}>
              <T
                phrase="View error details"
                context="Button label to view details about an error"
              />
            </MutedButton>
          </Spacing>
        )}
      </Alert>
    );
  }
}
