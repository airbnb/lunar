import { Info, StringUnitLength } from 'luxon';
import Core from '..';

export type Weekdays = [string, string, string, string, string, string, string];

export default function getWeekdays(
  type?: StringUnitLength,
  sundayFirst: boolean = false,
): Weekdays {
  const days = [...Info.weekdays(type, { locale: Core.locale() })];

  if (sundayFirst) {
    const sunday = days.pop();
    days.unshift(sunday!);
  }

  return days as Weekdays;
}
