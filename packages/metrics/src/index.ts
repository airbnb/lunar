import * as Sentry from '@sentry/browser';
import hasNewRelic from './utils/hasNewRelic';
import hasGoogleAnalytics from './utils/hasGoogleAnalytics';

export { Sentry };

export * from './types';

export type IgnoreError = string | RegExp;

export type Settings = {
  context?: { [key: string]: unknown };
  ignoreErrors?: IgnoreError[];
  sentry?: Sentry.BrowserOptions;
  sentryKey?: string;
  sentryProject?: string;
  userID?: number | null;
};

class Metrics {
  settings: Required<Settings> = {
    context: {},
    ignoreErrors: [],
    sentry: {},
    sentryKey: '',
    sentryProject: '',
    userID: null,
  };

  initialize(settings?: Settings) {
    this.settings = {
      ...this.settings,
      ...settings,
    };

    this.bootstrapNewRelic();
    this.bootstrapSentry();
    this.bootstrapGoogleAnalytics();
  }

  bootstrapNewRelic() {
    const { context, ignoreErrors, userID } = this.settings;

    if (!this.isNewRelicEnabled()) {
      return;
    }

    if (typeof global.navigator !== 'undefined') {
      newrelic.setCustomAttribute('browser-locale', global.navigator.language);
      newrelic.setCustomAttribute('user-agent', global.navigator.userAgent);
    }

    newrelic.setCustomAttribute('user-id', userID ? String(userID) : 'N/A');

    Object.keys(context).forEach(key => {
      newrelic.setCustomAttribute(
        key.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`),
        String(context[key]),
      );
    });

    newrelic.setErrorHandler(
      /* istanbul ignore next */ error => {
        const errorString = String(error);

        return ignoreErrors.some(filter =>
          typeof filter === 'string' ? errorString.includes(filter) : filter.test(errorString),
        );
      },
    );
  }

  bootstrapSentry() {
    const { context, ignoreErrors, sentry, sentryKey, sentryProject, userID } = this.settings;

    if (!this.isSentryEnabled() || typeof global.location === 'undefined') {
      return;
    }

    const { host, protocol } = global.location;

    Sentry.init({
      dsn: `${protocol}//${sentryKey}@${host}/${sentryProject}`,
      enabled: true,
      environment: process.env.NODE_ENV,
      ignoreErrors,
      release: process.env.SENTRY_RELEASE,
      ...sentry,
    });

    Sentry.configureScope(scope => {
      scope.setUser({ id: userID ? String(userID) : 'N/A' });
      scope.setExtras(context);

      if (typeof global.navigator !== 'undefined') {
        scope.setTag('browser.locale', global.navigator.language);
      }
    });
  }

  bootstrapGoogleAnalytics() {
    if (!this.isGoogleAnalyticsEnabled()) {
      return;
    }

    if (this.settings.userID) {
      ga('set', 'userId', `${this.settings.userID}`);
    }
  }

  isGoogleAnalyticsEnabled() {
    return hasGoogleAnalytics();
  }

  isNewRelicEnabled() {
    return hasNewRelic();
  }

  isSentryEnabled() {
    const { sentry, sentryKey, sentryProject } = this.settings;

    return sentry?.dsn || (sentryKey && sentryProject);
  }
}

export default new Metrics();
