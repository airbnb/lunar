import { init, configureScope } from '@sentry/browser';
import Metrics, { Settings } from '../src';

jest.mock('@sentry/browser');

const settings: Required<Settings> = {
  context: {},
  ignoreErrors: [],
  sentryDSN: '',
  sentryKey: '',
  sentryProject: '',
  userID: null,
  onSentryScope: null,
};

describe('Metrics', () => {
  beforeEach(() => {
    Metrics.settings = { ...settings };

    (init as jest.Mock).mockClear();
    (configureScope as jest.Mock).mockClear();

    global.newrelic.setCustomAttribute = jest.fn();
    global.newrelic.setErrorHandler = jest.fn();

    global.ga = (jest.fn() as unknown) as UniversalAnalytics.ga;
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
        sentryDSN: '',
        sentryKey: 'abc',
        sentryProject: '',
        userID: null,
        onSentryScope: null,
      });
    });

    it('calls boostrap functions', () => {
      const nrBoot = jest.spyOn(Metrics, 'bootstrapNewRelic');
      const sentryBoot = jest.spyOn(Metrics, 'bootstrapSentry');
      const bootstrapGoogleAnalyticsUser = jest.spyOn(Metrics, 'bootstrapGoogleAnalyticsUser');

      Metrics.initialize();

      expect(nrBoot).toHaveBeenCalled();
      expect(sentryBoot).toHaveBeenCalled();
      expect(bootstrapGoogleAnalyticsUser).toHaveBeenCalled();

      nrBoot.mockRestore();
      sentryBoot.mockRestore();
      bootstrapGoogleAnalyticsUser.mockRestore();
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
    let scope: any;

    beforeEach(() => {
      scope = {
        setUser: jest.fn(),
        setTag: jest.fn(),
        setExtras: jest.fn(),
      };

      (configureScope as jest.Mock).mockImplementation((cb: any) => cb(scope));

      Metrics.settings = {
        ...settings,
        sentryKey: '123456',
        sentryProject: 'lunar',
        ignoreErrors: ['APIError'],
      };
    });

    it('configures sentry', () => {
      Metrics.bootstrapSentry();

      expect(init).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: 'http://123456@localhost/lunar',
          environment: 'test',
          ignoreErrors: ['APIError'],
        }),
      );
    });

    it('configures sentry with a custom DSN', () => {
      Metrics.settings.sentryDSN = 'http://123456@localhost/proxy/sentry/lunar';
      Metrics.bootstrapSentry();

      expect(init).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: 'http://123456@localhost/proxy/sentry/lunar',
        }),
      );
    });

    it('doesnt configure if missing key', () => {
      Metrics.settings.sentryKey = '';
      Metrics.bootstrapSentry();

      expect(init).not.toHaveBeenCalled();
    });

    it('sets sentry attributes', () => {
      Metrics.bootstrapSentry();

      expect(scope.setUser).toHaveBeenCalledWith({
        id: 'N/A',
      });

      expect(scope.setTag).toHaveBeenCalledWith('browser.locale', 'en-US');
    });

    it('sets sentry attributes from context', () => {
      Metrics.settings.context = { foo: 'bar', camelCase: 'value' };
      Metrics.bootstrapSentry();

      expect(scope.setExtras).toHaveBeenCalledWith(
        expect.objectContaining({
          foo: 'bar',
          camelCase: 'value',
        }),
      );
    });

    it('calls `onSentryScope`', () => {
      const spy = jest.fn();

      Metrics.settings.onSentryScope = spy;
      Metrics.bootstrapSentry();

      expect(spy).toHaveBeenCalledWith(scope);
    });
  });

  describe('bootstrapGoogleAnalyticsUser', () => {
    it('sets the google analytics user if present', () => {
      Metrics.settings.userID = 12355;
      Metrics.bootstrapGoogleAnalyticsUser();

      expect(global.ga).toBeCalledTimes(1);
      expect(global.ga).toBeCalledWith('set', 'userId', '12355');
    });

    it('does not attempt to set the google analytics user if the user ID is not present', () => {
      Metrics.settings.userID = null;
      Metrics.bootstrapGoogleAnalyticsUser();

      expect(global.ga).not.toHaveBeenCalled();
    });

    it('does not attempt to set the google analytics user if ga is not present', () => {
      Metrics.settings.userID = 123;
      global.ga = undefined;

      expect(() => {
        Metrics.bootstrapGoogleAnalyticsUser();
      }).not.toThrow();
    });
  });
});
