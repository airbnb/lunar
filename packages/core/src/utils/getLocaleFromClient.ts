import parseLocale from './parseLocale';
import { Locale } from '../types';

export default function getLocaleFromClient(): Locale | undefined {
  let locale: Locale | undefined;

  (navigator.languages || [navigator.language]).some(lang => {
    locale = parseLocale(lang);

    return !!locale;
  });

  return locale;
}
