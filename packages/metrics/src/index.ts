import Raven from 'raven-js';
import hasNewRelic from './utils/hasNewRelic';
import hasGoogleAnalytics from './utils/hasGoogleAnalytics';

export type IgnoreError = string | RegExp;

export type Settings = {
  context?: { [key: string]: unknown };
  ignoreErrors?: IgnoreError[];
  sentryKey?: string;
  sentryProject?: string;
  userID?: number | null;
};

class Metrics {
  settings: Required<Settings> = {
    context: {},
    ignoreErrors: [],
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
    const { context, ignoreErrors, sentryKey, sentryProject, userID } = this.settings;

    if (!sentryKey || !sentryProject) {
      return;
    }

    const ravenHost = `${global.location.protocol}//${sentryKey}@${global.location.host}`;
    const ravenPath = `/proxy/sentry/${sentryProject}`;

    Raven.config(`${ravenHost}${ravenPath}`, {
      ignoreErrors,
      release: process.env.SENTRY_RELEASE,
      environment: process.env.NODE_ENV,
    })
      .setUserContext({
        browserLocale: global.navigator.language,
        userAgent: global.navigator.userAgent,
        userID: userID || 'N/A',
        ...context,
      })
      .install();
  }

  bootstrapGoogleAnalyticsUser() {
    if (hasGoogleAnalytics() && this.settings.userID) {
      ga('set', 'userId', `${this.settings.userID}`);
    }
  }
}

export default new Metrics();
