import { init as initSentry, configureScope, BrowserOptions } from '@sentry/browser';
import hasNewRelic from './utils/hasNewRelic';
import hasGoogleAnalytics from './utils/hasGoogleAnalytics';

export type IgnoreError = string | RegExp;

export type Settings = {
  context?: { [key: string]: unknown };
  ignoreErrors?: IgnoreError[];
  sentry?: BrowserOptions;
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
    this.bootstrapGoogleAnalyticsUser();
  }

  bootstrapNewRelic() {
    const { context, ignoreErrors, userID } = this.settings;

    if (!hasNewRelic()) {
      return;
    }

    newrelic.setCustomAttribute('browser-locale', global.navigator.language);
    newrelic.setCustomAttribute('user-agent', global.navigator.userAgent);
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
    const { host, protocol } = global.location;

    if (!(sentry && sentry.dsn) && !(sentryKey && sentryProject)) {
      return;
    }

    initSentry({
      dsn: `${protocol}//${sentryKey}@${host}/${sentryProject}`,
      enabled: true,
      environment: process.env.NODE_ENV,
      ignoreErrors,
      release: process.env.SENTRY_RELEASE,
      ...sentry,
    });

    configureScope(scope => {
      scope.setUser({ id: userID ? String(userID) : 'N/A' });
      scope.setTag('browser.locale', global.navigator.language);
      scope.setExtras(context);
    });
  }

  bootstrapGoogleAnalyticsUser() {
    if (hasGoogleAnalytics() && this.settings.userID) {
      ga('set', 'userId', `${this.settings.userID}`);
    }
  }
}

export default new Metrics();
