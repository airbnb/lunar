import { TimeZone } from '../types';

export default function getTimezoneFromClient(): TimeZone {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
