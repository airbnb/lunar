import { DateTime, DateTimeOptions as BaseOptions, IANAZone } from 'luxon';
import { DateTimeType } from '../types';
import Core from '..';

const clientLocale = Core.locale();
const clientZone = new IANAZone(Core.timezone());
const utcZone = new IANAZone('UTC');

export type Options = {
  locale?: string;
  sourceFormat?: string;
  timezone?: string | boolean;
};

export { DateTime };

export default function createDateTime(
  value?: DateTimeType,
  { locale, sourceFormat, timezone }: Options = {},
): DateTime | undefined {
  const options: BaseOptions = { locale: locale || clientLocale };

  let date;
  if (timezone === false) {
    options.zone = utcZone;
  } else if (timezone === true) {
    options.zone = clientZone;
  } else {
    options.zone = timezone || clientZone;
  }

  // Support moment objects for backwards compat
  const moment = (value as unknown) as {
    _isAMomentObject: boolean;
    toISOString: () => string;
  };

  if (moment && typeof moment === 'object' && '_isAMomentObject' in moment) {
    return DateTime.fromISO(moment.toISOString(), options);
  }

  try {
    // Parse in different formats
    if (value instanceof DateTime) {
      date = value.setLocale(options.locale!).setZone(options.zone);
    } else if (value instanceof Date) {
      date = DateTime.fromJSDate(value, options);
    } else if (typeof value === 'string' && value) {
      date = sourceFormat
        ? DateTime.fromFormat(value, sourceFormat, options)
        : DateTime.fromISO(value, options);
    } else if (typeof value === 'number') {
      date = DateTime.fromMillis(value, options);
    } else {
      date = DateTime.utc().setLocale(options.locale!);

      if (options.zone !== 'UTC') {
        date = date.setZone(options.zone);
      }
    }

    return date;
  } catch (error) {
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error(error);
    }

    return undefined;
  }
}
