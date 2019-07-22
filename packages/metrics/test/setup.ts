/* eslint-env jest */

import Metrics, { Settings } from '../src';

// eslint-disable-next-line import/prefer-default-export
export const settings: Required<Settings> = {
  context: {},
  ignoreErrors: [],
  sentry: {},
  sentryKey: '',
  sentryProject: '',
  userID: null,
};

beforeEach(() => {
  Metrics.settings = { ...settings, sentryKey: 'key', sentryProject: 'lunar' };
});

afterEach(() => {
  Metrics.settings = { ...settings };
});
