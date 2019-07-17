import { captureException, withScope } from '@sentry/browser';
import hasNewRelic from './hasNewRelic';

type Params = { [key: string]: unknown };

export default function captureError(
  error?: string | Event | Error | null,
  options: {
    context?: Params;
    extra?: Params;
  } = {},
) {
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

  withScope(scope => {
    if (options.context) {
      scope.setContext(errorInstance.name, options.context);
    }

    if (options.extra) {
      scope.setExtras(options.extra);
    }

    captureException(errorInstance);
  });
}
