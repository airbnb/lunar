import { init as initSentry, configureScope, Scope } from '@sentry/browser';
import hasNewRelic from './utils/hasNewRelic';
import hasGoogleAnalytics from './utils/hasGoogleAnalytics';

export type IgnoreError = string | RegExp;

export type Settings = {
  context?: { [key: string]: unknown };
  ignoreErrors?: IgnoreError[];
  sentryDSN?: string;
  sentryKey?: string;
  sentryProject?: string;
  userID?: number | null;
  onSentryScope?: ((scope: Scope) => void) | null;
};

class Metrics {
  settings: Required<Settings> = {
    context: {},
    ignoreErrors: [],
    sentryDSN: '',
    sentryKey: '',
    sentryProject: '',
    userID: null,
    onSentryScope: null,
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
    const {
      context,
      ignoreErrors,
      sentryDSN,
      sentryKey,
      sentryProject,
      userID,
      onSentryScope,
    } = this.settings;
    const { host, protocol } = global.location;

    if (!sentryDSN && (!sentryKey || !sentryProject)) {
      return;
    }

    initSentry({
      dsn: sentryDSN || `${protocol}//${sentryKey}@${host}/${sentryProject}`,
      enabled: true,
      environment: process.env.NODE_ENV,
      ignoreErrors,
      release: process.env.SENTRY_RELEASE,
    });

    configureScope(scope => {
      scope.setUser({ id: userID ? String(userID) : 'N/A' });
      scope.setTag('browser.locale', global.navigator.language);
      scope.setExtras(context);

      if (onSentryScope) {
        onSentryScope(scope);
      }
    });
  }

  bootstrapGoogleAnalyticsUser() {
    if (hasGoogleAnalytics() && this.settings.userID) {
      ga('set', 'userId', `${this.settings.userID}`);
    }
  }
}

export default new Metrics();
