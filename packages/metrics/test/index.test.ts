import Raven from 'raven-js';
import Metrics, { Settings } from '../src';

jest.mock('raven-js', () => {
  const ravenClass: any = {
    captureBreadcrumb: jest.fn(),
    captureException: jest.fn(),
  };

  ravenClass.config = jest.fn().mockReturnValue(ravenClass);
  ravenClass.setUserContext = jest.fn().mockReturnValue(ravenClass);
  ravenClass.install = jest.fn().mockReturnValue(ravenClass);

  return ravenClass;
});

const settings: Required<Settings> = {
  context: {},
  ignoreErrors: [],
  sentryKey: '',
  sentryProject: '',
  userID: null,
};

describe('Metrics', () => {
  beforeEach(() => {
    Metrics.settings = { ...settings };

    (Raven.config as jest.Mock).mockClear();
    (Raven.setUserContext as jest.Mock).mockClear();

    global.newrelic.setCustomAttribute = jest.fn();
    global.newrelic.setErrorHandler = jest.fn();
  });

  afterEach(() => {
    Metrics.settings = { ...settings };
  });

  describe('initialize()', () => {
    it('sets settings', () => {
      Metrics.initialize({
        context: { foo: 'bar' },
        sentryKey: 'abc',
      });

      expect(Metrics.settings).toEqual({
        context: { foo: 'bar' },
        ignoreErrors: [],
        sentryKey: 'abc',
        sentryProject: '',
        userID: null,
      });
    });

    it('calls boostrap functions', () => {
      const nrBoot = jest.spyOn(Metrics, 'bootstrapNewRelic');
      const sentryBoot = jest.spyOn(Metrics, 'bootstrapSentry');

      Metrics.initialize();

      expect(nrBoot).toHaveBeenCalled();
      expect(sentryBoot).toHaveBeenCalled();

      nrBoot.mockRestore();
      sentryBoot.mockRestore();
    });
  });

  describe('bootstrapNewRelic()', () => {
    it('sets newrelic attributes', () => {
      Metrics.bootstrapNewRelic();

      expect(global.newrelic.setCustomAttribute).toHaveBeenCalledTimes(3);
      expect(global.newrelic.setCustomAttribute).toHaveBeenCalledWith('user-id', 'N/A');
      expect(global.newrelic.setCustomAttribute).toHaveBeenCalledWith('browser-locale', 'en-US');
    });

    it('sets newrelic attributes from context', () => {
      Metrics.settings.context = { foo: 'bar', camelCase: 'value' };
      Metrics.bootstrapNewRelic();

      expect(global.newrelic.setCustomAttribute).toHaveBeenCalledTimes(5);
      expect(global.newrelic.setCustomAttribute).toHaveBeenCalledWith('foo', 'bar');
      expect(global.newrelic.setCustomAttribute).toHaveBeenCalledWith('camel-case', 'value');
    });

    it('sets user ID', () => {
      Metrics.settings.userID = 123;
      Metrics.bootstrapNewRelic();

      expect(global.newrelic.setCustomAttribute).toHaveBeenCalledWith('user-id', '123');
    });

    it('sets an error handler', () => {
      Metrics.bootstrapNewRelic();

      expect(global.newrelic.setErrorHandler).toHaveBeenCalled();
    });
  });

  describe('bootstrapSentry()', () => {
    beforeEach(() => {
      Metrics.settings = {
        ...settings,
        sentryKey: '123456',
        sentryProject: 'lunar',
        ignoreErrors: ['APIError'],
      };
    });

    it('configures sentry', () => {
      Metrics.bootstrapSentry();

      expect(Raven.config).toHaveBeenCalledWith(
        'http://123456@localhost/proxy/sentry/lunar',
        expect.objectContaining({
          environment: 'test',
          ignoreErrors: ['APIError'],
        }),
      );
      expect(Raven.install).toHaveBeenCalled();
    });

    it('doesnt configure if missing key', () => {
      Metrics.settings.sentryKey = '';
      Metrics.bootstrapSentry();

      expect(Raven.config).not.toHaveBeenCalled();
    });

    it('sets sentry attributes', () => {
      Metrics.bootstrapSentry();

      expect(Raven.setUserContext).toHaveBeenCalledWith(
        expect.objectContaining({
          userID: 'N/A',
          browserLocale: 'en-US',
        }),
      );
    });

    it('sets sentry attributes from context', () => {
      Metrics.settings.context = { foo: 'bar', camelCase: 'value' };
      Metrics.bootstrapSentry();

      expect(Raven.setUserContext).toHaveBeenCalledWith(
        expect.objectContaining({
          foo: 'bar',
          camelCase: 'value',
        }),
      );
    });
  });
});
