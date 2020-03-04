/* eslint-disable no-negated-condition */

import React from 'react';
import { rangeFromDayBundle, rangeToDayBundle, dateMediumBundle } from '../../messages';
import { DateTimeType, Locale } from '../../types';
import DateTime from '../DateTime';
import Empty from '../Empty';
import createDateTime from '../../utils/createDateTime';

export type DateTimeRangeProps = {
  /** The starting timestamp. */
  from?: DateTimeType;
  /** Locale to translate and format the timestamp to. Defaults to "en". */
  locale?: Locale;
  /** Separating character between both timestamps. */
  separator?: string;
  /** Set to a new timezone. Defaults to the client timezone or "UTC". */
  timezone?: string | boolean;
  /** The ending timestamp. */
  to?: DateTimeType;
};

/** Display a range between 2 timestamps. */
export default function DateTimeRange({
  from,
  locale,
  separator = ' – ',
  timezone,
  to,
}: DateTimeRangeProps) {
  if (!from || !to) {
    return <Empty />;
  }

  const fromTimeStamp = createDateTime(from, { locale, timezone });
  const toTimeStamp = createDateTime(to, { locale, timezone });

  if (__DEV__) {
    if (!fromTimeStamp.isValid || !toTimeStamp.isValid) {
      throw new Error('Invalid timestamps passed to `DateTimeRange`.');
    }

    if (toTimeStamp < fromTimeStamp) {
      throw new Error('Invalid chronological order of timestamps passed to `DateTimeRange`.');
    }
  }

  const props = { locale, timezone };
  let fromFormat = rangeFromDayBundle.get(locale);
  let toFormat;

  if (fromTimeStamp.year !== toTimeStamp.year) {
    fromFormat = dateMediumBundle.get(locale);
    toFormat = dateMediumBundle.get(locale);
  } else if (fromTimeStamp.month !== toTimeStamp.month) {
    toFormat = dateMediumBundle.get(locale);
  } else if (fromTimeStamp.day !== toTimeStamp.day) {
    toFormat = rangeToDayBundle.get(locale);
  } else {
    return <DateTime {...props} medium noTime noTimezone at={toTimeStamp} />;
  }

  return (
    <span>
      <DateTime {...props} at={fromTimeStamp} format={fromFormat} />
      {separator}
      <DateTime {...props} at={toTimeStamp} format={toFormat} />
    </span>
  );
}
