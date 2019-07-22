import { addBreadcrumb, Breadcrumb } from '@sentry/browser';
import Metrics from '..';

export default function captureBreadcrumb(crumb: Breadcrumb) {
  if (Metrics.isSentryEnabled()) {
    addBreadcrumb(crumb);
  }
}
