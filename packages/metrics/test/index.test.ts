/* eslint-disable jest/prefer-spy-on */

import { init, configureScope } from '@sentry/browser';
import { Scope } from '@sentry/types';
import Metrics from '../src';
import { settings } from './setup';

jest.mock('@sentry/browser');

describe('Metrics', () => {
  beforeEach(() => {
    (init as jest.Mock).mockClear();
    (configureScope as jest.Mock).mockClear();

    global.newrelic.setCustomAttribute = jest.fn();
    global.newrelic.setErrorHandler = jest.fn();
    global.ga = (jest.fn() as unknown) as UniversalAnalytics.ga;
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
        sentry: {},
        sentryKey: 'abc',
        sentryProject: 'lunar',
        userID: null,
      });
    });

    it('calls boostrap functions', () => {
      const nrBoot = jest.spyOn(Metrics, 'bootstrapNewRelic');
      const sentryBoot = jest.spyOn(Metrics, 'bootstrapSentry');
      const bootstrapGoogleAnalytics = jest.spyOn(Metrics, 'bootstrapGoogleAnalytics');

      Metrics.initialize();

      expect(nrBoot).toHaveBeenCalled();
      expect(sentryBoot).toHaveBeenCalled();
      expect(bootstrapGoogleAnalytics).toHaveBeenCalled();

      nrBoot.mockRestore();
      sentryBoot.mockRestore();
      bootstrapGoogleAnalytics.mockRestore();
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
    let scope: Scope;

    beforeEach(() => {
      // @ts-ignore
      scope = {
        setUser: jest.fn(),
        setTag: jest.fn(),
        setExtras: jest.fn(),
      };

      (configureScope as jest.Mock).mockImplementation(cb => cb(scope));

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

    it('configures sentry with a custom DSN and options', () => {
      Metrics.settings.sentry = {
        dsn: 'http://123456@localhost/proxy/sentry/lunar',
        sampleRate: 0,
      };
      Metrics.bootstrapSentry();

      expect(init).toHaveBeenCalledWith(
        expect.objectContaining({
          dsn: 'http://123456@localhost/proxy/sentry/lunar',
          sampleRate: 0,
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
  });

  describe('bootstrapGoogleAnalytics', () => {
    it('sets the google analytics user if present', () => {
      Metrics.settings.userID = 12355;
      Metrics.bootstrapGoogleAnalytics();

      expect(global.ga).toHaveBeenCalledTimes(1);
      expect(global.ga).toHaveBeenCalledWith('set', 'userId', '12355');
    });

    it('does not attempt to set the google analytics user if the user ID is not present', () => {
      Metrics.settings.userID = null;
      Metrics.bootstrapGoogleAnalytics();

      expect(global.ga).not.toHaveBeenCalled();
    });

    it('does not attempt to set the google analytics user if ga is not present', () => {
      Metrics.settings.userID = 123;
      global.ga = undefined;

      expect(() => {
        Metrics.bootstrapGoogleAnalytics();
      }).not.toThrow();
    });
  });
});
