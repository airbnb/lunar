import hasNewRelic from './hasNewRelic';

export default function captureFinished() {
  if (hasNewRelic()) {
    newrelic.finished(Date.now());
  }
}
