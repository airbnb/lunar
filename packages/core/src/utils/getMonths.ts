import { Info, UnitLength } from 'luxon';
import Core from '..';

export type Months = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

export default function getMonths(type?: UnitLength): Months {
  return Info.months(type, { locale: Core.locale() }) as Months;
}
