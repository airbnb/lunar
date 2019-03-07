import Raven from 'raven-js';

export default function captureBreadcrumb(options: Raven.Breadcrumb) {
  Raven.captureBreadcrumb(options);
}
