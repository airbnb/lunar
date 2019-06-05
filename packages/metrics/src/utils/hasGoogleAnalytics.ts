export default function hasGoogleAnalytics() {
  return !!ga && typeof ga === 'function';
}
