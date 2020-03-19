import parseLocale from './parseLocale';
import { Locale } from '../types';

export default function getLocaleFromClient(): Locale | undefined {
  let locale: Locale | undefined;

  if (typeof global.navigator === 'undefined') {
    return locale;
  }

  (global.navigator.languages || [global.navigator.language]).some(lang => {
    locale = parseLocale(lang);

    return !!locale;
  });

  return locale;
}
