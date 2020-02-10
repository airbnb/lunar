import T from '../components/Translate';
import { Locale } from '../types';

let loaded = false;
let languages: { [locale: string]: string } = {};

export default function getLanguageFromLocale(locale: Locale): string {
  if (!loaded) {
    loaded = true;
    languages = {
      nl: T.phrase('lunar.language.dutch', 'Dutch'),
      en: T.phrase('lunar.language.english', 'English'),
      fr: T.phrase('lunar.language.french', 'French'),
      de: T.phrase('lunar.language.german', 'German'),
      it: T.phrase('lunar.language.italian', 'Italian'),
      ja: T.phrase('lunar.language.japanese', 'Japanese'),
      ko: T.phrase('lunar.language.korean', 'Korean'),
      zh: T.phrase('lunar.language.mandarin', 'Mandarin'),
      ms: T.phrase('lunar.language.malay', 'Malay'),
      pt: T.phrase('lunar.language.portuguese', 'Portuguese'),
      ru: T.phrase('lunar.language.russian', 'Russian'),
      es: T.phrase('lunar.language.spanish', 'Spanish'),
      tr: T.phrase('lunar.language.turkish', 'Turkish'),
    };
  }

  return languages[locale];
}
