import { ARROW_LEFT, ARROW_UP, ARROW_DOWN, ARROW_RIGHT } from '../../keys';

export const AIRBNB_REGEX = /\b(((air|ari|iar)[bn]{3})(?!\.com))\b/gi;
export const NON_WORD_REGEX = /\W/;

export const ARROW_KEYS = [ARROW_LEFT, ARROW_UP, ARROW_DOWN, ARROW_RIGHT];

export const NO_LOCALE = 'none';
export const AUTO_DETECT_LOCALE = 'auto';
export const LOCALE_TO_LT_LOCALE: { [locale: string]: string } = {
  de: 'de-DE',
  en: 'en-US',
  ja: 'ja-JP',
  pt: 'pt-PT',
  ru: 'ru-RU',
  zh: 'zh-CN',
};
