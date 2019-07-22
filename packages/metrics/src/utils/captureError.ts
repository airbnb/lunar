import { captureException, withScope } from '@sentry/browser';
import { CaptureOptions } from '../types';
import Metrics from '..';

export default function captureError(
  error?: string | Event | Error | null,
  options: CaptureOptions = {},
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

  if (Metrics.isNewRelicEnabled()) {
    newrelic.noticeError(errorInstance);
  }

  if (Metrics.isSentryEnabled()) {
    withScope(scope => {
      if (options.contexts) {
        Object.keys(options.contexts).forEach(key => {
          scope.setContext(key, options.contexts![key]);
        });
      }

      if (options.extra) {
        scope.setExtras(options.extra);
      }

      if (options.fingerprint) {
        scope.setFingerprint(options.fingerprint);
      }

      if (options.tags) {
        scope.setTags(options.tags);
      }

      captureException(errorInstance);
    });
  }
}
