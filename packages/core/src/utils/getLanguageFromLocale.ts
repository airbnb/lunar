import T from '../components/Translate';
import { Locale } from '../types';

let loaded = false;
let languages: { [locale: string]: string } = {};

export default function getLanguageFromLocale(locale: Locale): string {
  if (!loaded) {
    loaded = true;
    languages = {
      nl: T.phrase(
        'Dutch',
        {},
        { key: 'lunar.language.dutch', context: 'Language name within a language selector' },
      ),
      en: T.phrase(
        'English',
        {},
        { key: 'lunar.language.english', context: 'Language name within a language selector' },
      ),
      fr: T.phrase(
        'French',
        {},
        { key: 'lunar.language.french', context: 'Language name within a language selector' },
      ),
      de: T.phrase(
        'German',
        {},
        { key: 'lunar.language.german', context: 'Language name within a language selector' },
      ),
      it: T.phrase(
        'Italian',
        {},
        { key: 'lunar.language.italian', context: 'Language name within a language selector' },
      ),
      ja: T.phrase(
        'Japanese',
        {},
        { key: 'lunar.language.japanese', context: 'Language name within a language selector' },
      ),
      ko: T.phrase(
        'Korean',
        {},
        { key: 'lunar.language.korean', context: 'Language name within a language selector' },
      ),
      zh: T.phrase(
        'Mandarin',
        {},
        { key: 'lunar.language.mandarin', context: 'Language name within a language selector' },
      ),
      ms: T.phrase(
        'Malay',
        {},
        { key: 'lunar.language.malay', context: 'Language name within a language selector' },
      ),
      pt: T.phrase(
        'Portuguese',
        {},
        { key: 'lunar.language.portuguese', context: 'Language name within a language selector' },
      ),
      ru: T.phrase(
        'Russian',
        {},
        { key: 'lunar.language.russian', context: 'Language name within a language selector' },
      ),
      es: T.phrase(
        'Spanish',
        {},
        { key: 'lunar.language.spanish', context: 'Language name within a language selector' },
      ),
      tr: T.phrase(
        'Turkish',
        {},
        { key: 'lunar.language.turkish', context: 'Language name within a language selector' },
      ),
    };
  }

  return languages[locale];
}
