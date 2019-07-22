import { captureEvent } from '@sentry/browser';
import { CaptureOptions } from '../types';
import Metrics from '..';

export default function captureFinished(options?: CaptureOptions) {
  const timestamp = Date.now();

  if (Metrics.isNewRelicEnabled()) {
    newrelic.finished(timestamp);
  }

  if (Metrics.isSentryEnabled()) {
    captureEvent({
      ...options,
      event_id: 'finished',
      timestamp,
    });
  }
}
