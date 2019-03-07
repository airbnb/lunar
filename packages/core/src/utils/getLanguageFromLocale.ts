import Core from '..';
import { Locale } from '../types';

let loaded = false;
let languages: { [locale: string]: string } = {};

export default function getLanguageFromLocale(locale: Locale): string {
  if (!loaded) {
    loaded = true;
    languages = {
      nl: Core.translate('Dutch', {}, 'Language name within a language selector'),
      en: Core.translate('English', {}, 'Language name within a language selector'),
      fr: Core.translate('French', {}, 'Language name within a language selector'),
      de: Core.translate('German', {}, 'Language name within a language selector'),
      it: Core.translate('Italian', {}, 'Language name within a language selector'),
      ja: Core.translate('Japanese', {}, 'Language name within a language selector'),
      ko: Core.translate('Korean', {}, 'Language name within a language selector'),
      zh: Core.translate('Mandarin', {}, 'Language name within a language selector'),
      ms: Core.translate('Malay', {}, 'Language name within a language selector'),
      pt: Core.translate('Portuguese', {}, 'Language name within a language selector'),
      ru: Core.translate('Russian', {}, 'Language name within a language selector'),
      es: Core.translate('Spanish', {}, 'Language name within a language selector'),
      tr: Core.translate('Turkish', {}, 'Language name within a language selector'),
    };
  }

  return languages[locale];
}
