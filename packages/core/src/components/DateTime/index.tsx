import React from 'react';
import { ToRelativeOptions } from 'luxon';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import createDateTime from '../../utils/createDateTime';
import Interval from '../Interval';
import Empty from '../Empty';
import T from '../Translate';
import toMilliseconds from '../../utils/toMilliseconds';
import { FORMAT_YMD, FORMAT_PREFIX_DAY, FORMAT_SUFFIX_TIMEZONE } from '../../constants';
import {
  timeBundle,
  dateMicroBundle,
  dateShortBundle,
  dateMediumBundle,
  dateLongBundle,
} from '../../messages';
import { DateTimeType } from '../../types';

const MINUTE_THRESHOLD = toMilliseconds('1 minute');
const MIN_RELATIVE_DATETIME_REFRESH_INTERVAL = toMilliseconds('5 seconds');
const MAX_RELATIVE_DATETIME_REFRESH_INTERVAL = toMilliseconds('6 hours');

const formatPropType = mutuallyExclusiveTrueProps(
  'clock',
  'micro',
  'short',
  'medium',
  'long',
  'relative',
  'relativeCompact',
);

export type Props = {
  /** A timestamp, either a string, number, Date object, or Luxon DateTime object. */
  at?: DateTimeType;
  /** Display the time with no date. */
  clock?: boolean;
  /** A date time pattern to format the timestamp to. */
  format?: string;
  /** Locale to translate and format the timestamp to. Defaults to "en". */
  locale?: string;
  /** Use long format. */
  long?: boolean;
  /** Use medium format. */
  medium?: boolean;
  /** Use micro format. */
  micro?: boolean;
  /** Remove the weekday from the display. */
  noDay?: boolean;
  /** Disable timestamps in the future. Will be reset to current timestamp. */
  noFuture?: boolean;
  /** Remove the time from the display. */
  noTime?: boolean;
  /** Remove the timezone from the display. */
  noTimezone?: boolean;
  /** Use relative format. */
  relative?: boolean;
  /** Use relative format, without 'ago' suffix (past) or 'in' prefix (future). */
  relativeCompact?: boolean;
  /** Use short format. */
  short?: boolean;
  /** A date time pattern to parse the timestamp from. */
  sourceFormat?: string;
  /** Set to a new timezone. Defaults to the client timezone or "UTC". */
  timezone?: string | boolean;
  /** Include the weekday in the display. */
  withDay?: boolean;
};

/** Display a formatted and localized timestamp. */
export default class DateTime extends React.PureComponent<Props> {
  static propTypes = {
    clock: formatPropType,
    long: formatPropType,
    medium: formatPropType,
    micro: formatPropType,
    relative: formatPropType,
    relativeCompact: formatPropType,
    short: formatPropType,
  };

  static defaultProps = {
    at: null,
    clock: false,
    format: FORMAT_YMD,
    long: false,
    medium: false,
    micro: false,
    noDay: false,
    noFuture: false,
    noTime: false,
    noTimezone: false,
    relative: false,
    relativeCompact: false,
    short: false,
    sourceFormat: '',
    withDay: false,
  };

  static format(props: Props): string {
    const {
      at,
      clock,
      format: baseFormat,
      locale,
      long,
      medium,
      micro,
      noDay,
      noFuture,
      noTime,
      noTimezone,
      relative,
      relativeCompact,
      short,
      sourceFormat,
      timezone,
      withDay,
    } = props;

    if (!at) {
      return '';
    }

    // Render a timestamp
    let timeStamp = createDateTime(at, {
      locale,
      sourceFormat,
      timezone,
    });
    let format = baseFormat || '';
    let affixDay = withDay;
    let affixTime = true;

    if (__DEV__) {
      if (!timeStamp.isValid) {
        throw new Error('Invalid timestamp passed to `DateTime`.');
      }
    }

    // Disable future dates
    if (noFuture) {
      const now = createDateTime(null, { timezone });

      if (timeStamp > now) {
        timeStamp = now;
      }
    }

    // Return early for relative timestamps
    if (relative || relativeCompact) {
      return DateTime.relative(timeStamp, { style: relativeCompact ? 'short' : 'long' });
    }

    // Determine base date format
    if (micro) {
      format = dateMicroBundle.get(locale);
    } else if (short) {
      format = dateShortBundle.get(locale);
    } else if (medium) {
      format = dateMediumBundle.get(locale);
    } else if (long) {
      format = dateLongBundle.get(locale);
      affixDay = true;
    } else if (clock) {
      format = timeBundle.get(locale);
      affixTime = false;
    } else {
      return timeStamp.toFormat(format);
    }

    // Prepend day
    if (affixDay && !noDay) {
      format = `${FORMAT_PREFIX_DAY}, ${format}`;
    }

    // Append time
    if (affixTime && !noTime) {
      format += ` ${timeBundle.get(locale)}`;
    }

    // Append timezone
    if (!noTimezone) {
      format += ` ${FORMAT_SUFFIX_TIMEZONE}`;
    }

    return timeStamp.toFormat(format);
  }

  static relative(timeStamp: DateTimeType, options: ToRelativeOptions = {}): string {
    const relative = createDateTime(timeStamp);
    const diff = DateTime.diff(relative, options.base);
    const fewPhrase =
      options.style === 'narrow'
        ? T.phrase(
            'a few sec.',
            {},
            { context: 'Relative time within a minute', key: 'lunar.datetime.secsAgoNarrow' },
          )
        : T.phrase(
            'a few seconds',
            {},
            { context: 'Relative time within a minute', key: 'lunar.datetime.secsAgo' },
          );

    if (diff > 0 && diff < MINUTE_THRESHOLD) {
      if (!options.style || options.style === 'long') {
        return T.phrase(
          'in %{time}',
          { time: fewPhrase },
          {
            context: 'Relative time explaining something will happen soon',
            key: 'lunar.datetime.in',
          },
        );
      }

      return fewPhrase;
    }

    if (diff <= 0 && diff > -MINUTE_THRESHOLD) {
      if (!options.style || options.style === 'long') {
        return T.phrase(
          '%{time} ago',
          { time: fewPhrase },
          {
            context: 'Relative time explaining something recently happened',
            key: 'lunar.datetime.ago',
          },
        );
      }

      return fewPhrase;
    }

    return relative.toRelative(options) || relative.toFormat(FORMAT_YMD);
  }

  static diff(to: DateTimeType, from: DateTimeType | null = null): number {
    return (
      createDateTime(to, { timezone: 'UTC' }).toMillis() -
      createDateTime(from, { timezone: 'UTC' }).toMillis()
    );
  }

  getRefreshInterval() {
    const { at, sourceFormat } = this.props;
    const difference = Math.abs(DateTime.diff(createDateTime(at, { sourceFormat })));

    // Decay refresh rate based on how long its been since the given timestamp
    // < 1 minute: update every 5 seconds
    // 10 minutes: update every 1 minute
    // 1 hour: update every 6 minutes
    // 1 day: update every 2.4 hours
    // > 2 day: update every 6 hours
    return Math.min(
      Math.max(difference / 10, MIN_RELATIVE_DATETIME_REFRESH_INTERVAL),
      MAX_RELATIVE_DATETIME_REFRESH_INTERVAL,
    );
  }

  rfc() {
    const { at, sourceFormat } = this.props;

    return createDateTime(at, { sourceFormat }).toFormat("yyyy-MM-dd'T'HH:mm:ssZZ"); // RFC3339
  }

  renderTimeElement = () => {
    const formatted = DateTime.format(this.props);

    if (!formatted) {
      return <Empty />;
    }

    return <time dateTime={this.rfc()}>{formatted}</time>;
  };

  render() {
    if (!this.props.relative) {
      return this.renderTimeElement();
    }

    return (
      <Interval key={this.rfc()} every={this.getRefreshInterval()}>
        {this.renderTimeElement}
      </Interval>
    );
  }
}
