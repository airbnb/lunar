import Raven from 'raven-js';
import captureBreadcrumb from '../../src/utils/captureBreadcrumb';

jest.mock('raven-js');

describe('captureBreadcrumb()', () => {
  it('passes to raven', () => {
    const options = { message: 'bar' };

    captureBreadcrumb(options);

    expect(Raven.captureBreadcrumb).toHaveBeenCalledWith(options);
  });
});
