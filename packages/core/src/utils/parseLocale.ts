import { LOCALES } from '../constants';
import { Locale } from '../types';

const DIVIDER = /-|_/;

export default function parseLocale(value?: string): Locale | undefined {
  let locale = value;

  if (locale) {
    locale = locale.toLowerCase();

    // We currently only support the language, so strip the territory
    if (locale.match(DIVIDER)) {
      [locale] = locale.split(DIVIDER);
    }

    const typedLocale = locale as Locale;

    // And we only want a locale that matches our whitelist
    if (LOCALES.includes(typedLocale)) {
      return typedLocale;
    }
  }

  return undefined;
}
