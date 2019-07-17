import { captureException } from '@sentry/browser';
import hasNewRelic from './hasNewRelic';

export default function captureError(error?: string | Event | Error | null) {
  if (!error) {
    return;
  }

  let errorInstance: Error;

  if (typeof error === 'string') {
    errorInstance = new Error(error);
  } else if (error instanceof Event) {
    errorInstance = new Error(`Captured an event: ${String(error)}`);
  } else {
    errorInstance = error;
  }

  if (hasNewRelic()) {
    newrelic.noticeError(errorInstance);
  }

  captureException(errorInstance);
}
