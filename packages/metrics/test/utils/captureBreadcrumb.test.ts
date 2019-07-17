import { addBreadcrumb } from '@sentry/browser';
import captureBreadcrumb from '../../src/utils/captureBreadcrumb';

jest.mock('@sentry/browser');

describe('captureBreadcrumb()', () => {
  it('passes to sentry', () => {
    const options = { message: 'bar' };

    captureBreadcrumb(options);

    expect(addBreadcrumb).toHaveBeenCalledWith(options);
  });
});
