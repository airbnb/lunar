import { addBreadcrumb } from '@sentry/browser';
import captureBreadcrumb from '../../src/utils/captureBreadcrumb';
import Metrics from '../../src';
import '../setup';

jest.mock('@sentry/browser');

describe('captureBreadcrumb()', () => {
  beforeEach(() => {
    (addBreadcrumb as jest.Mock).mockReset();
  });

  it('passes to sentry', () => {
    const options = { message: 'foo' };

    captureBreadcrumb(options);

    expect(addBreadcrumb).toHaveBeenCalledWith(options);
  });

  it('doesnt pass to sentry when not enabled', () => {
    Metrics.settings.sentryKey = '';
    Metrics.settings.sentryProject = '';

    captureBreadcrumb({ message: 'bar' });

    expect(addBreadcrumb).not.toHaveBeenCalled();
  });
});
