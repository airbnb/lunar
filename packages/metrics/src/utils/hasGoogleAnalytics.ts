export default function hasGoogleAnalytics() {
  return typeof global.ga === 'function';
}
