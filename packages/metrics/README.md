# Lunar Metrics

Provides integrated [NewRelic](https://newrelic.com/) and [Sentry](https://sentry.io/welcome/)
insights and metrics logging.

This will also set the Google Analytics `userId` if `ga` is global and `userID` is passed to 
`Metrics.initialize`.

```bash static
npm install @airbnb/lunar-metrics --save
```

## Setup

Initialize the metrics package with your Sentry key/project (optional) and the current user ID.

```js static
import Metrics from '@airbnb/lunar-metrics';

Metrics.initialize({
  context: { additionalParams: 'toLog' },
  ignoreErrors: ['APIError'],
  sentryKey: 'abcdef',
  sentryProject: 'project',
  userID: getUserID(),
});
```

> This will automatically bootstrap NewRelic (if the global below exists) and Sentry (if the
> key/project are defined).

### NewRelic

Rather than being configured in your application logic, NewRelic is configured in the DOM with a
`script` block, usually within a `index.html` file. The script block can be found in your NewRelic
project -> Application settings page, and looks something like the following.

```html static
<script type="text/javascript">
  window.NREUM || (NREUM = {}),
    (__nr_require = function(t, e, n) {
      /* CODE */
    });
  if (window.location.origin.indexOf('localhost') >= 0) {
    // development:
    NREUM.info = {
      beacon: 'bam.nr-data.net',
      errorBeacon: 'bam.nr-data.net',
      licenseKey: 'foobarbaz',
      applicationID: '12345678',
      sa: 1,
    };
  } else {
    // production:
    NREUM.info = {
      beacon: 'bam.nr-data.net',
      errorBeacon: 'bam.nr-data.net',
      licenseKey: 'foobarbaz',
      applicationID: '12345678',
      sa: 1,
    };
  }
</script>
```

> If you'd like to support separate development and production projects, a localhost conditional
> like the above will work.

## Usage

### Logging Errors

To log an error to both NewRelic and Sentry, use `captureError`. This function accepts a string,
`Error`, or `Event` instance. It optionally supports additional
[params for Sentry](https://docs.sentry.io/clients/javascript/usage/#passing-additional-data) as the
2nd argument.

```js static
import captureError from '@airbnb/lunar-metrics/lib/utils/captureError';

captureError('Something is broken');

captureError(new Error('Something is really really broken!'), {
  level: 'error',
});

captureError(someDomEvent);
```

### Capturing Breadcrumbs

If you'd like to capture a [Sentry breadcrumb](https://docs.sentry.io/learn/breadcrumbs/) to trail
along side errors, use `captureBreadcrumb`.

```js static
import captureBreadcrumb from '@airbnb/lunar-metrics/lib/utils/captureBreadcrumb';

captureBreadcrumb({
  message: 'Failed to login',
  category: 'auth',
  data: {
    username: 'foobar',
  },
});
```
