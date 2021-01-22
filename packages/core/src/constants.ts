import { Currency, Locale, LocaleDefinition, TimeZone } from './types';

// I18N/L10N
export const DEFAULT_LOCALE: Locale = 'en';
export const DEFAULT_CURRENCY: Currency = 'USD';
export const DEFAULT_TIMEZONE: TimeZone = 'UTC';

export const LOCALES: Locale[] = [
  'de', // German
  'en', // English
  'es', // Spanish
  'fr', // French
  'it', // Italian
  'ja', // Japanese
  'ko', // Korean
  'ms', // Malay
  'nl', // Dutch
  'pt', // Portuguese
  'ru', // Russian
  'tr', // Turkish
  'zh', // Mandarin
];

// Used for Google Translate API
export const TRANSLATE_LOCALES: LocaleDefinition[] = [
  { locale: 'ar', label: 'عربى', name: 'Arabic' },
  { locale: 'ca', label: 'Català', name: 'Catalan' },
  { locale: 'cs', label: 'Čeština', name: 'Czech' },
  { locale: 'da', label: 'Dansk', name: 'Danish' },
  { locale: 'de', label: 'Deutsch', name: 'German' },
  { locale: 'el', label: 'Ελληνικά', name: 'Greek' },
  { locale: 'en', label: 'English', name: 'English' },
  { locale: 'es', label: 'Español', name: 'Spanish' },
  { locale: 'es-419', label: 'Español (América Latina)', name: 'Spanish (Latin America)' },
  { locale: 'fi', label: 'Suomalainen', name: 'Finnish' },
  { locale: 'fr', label: 'Français', name: 'French' },
  { locale: 'he', label: 'עִברִית', name: 'Hebrew' },
  { locale: 'hr', label: 'Hrvatski', name: 'Croatian' },
  { locale: 'hu', label: 'Magyar', name: 'Hungarian' },
  { locale: 'id', label: 'Bahasa Indonesia', name: 'Indonesian' },
  { locale: 'is', label: 'Íslensku', name: 'Icelandic' },
  { locale: 'it', label: 'Italiano', name: 'Italian' },
  { locale: 'ja', label: '日本語', name: 'Japanese' },
  { locale: 'ko', label: '한국어', name: 'Korean' },
  { locale: 'ms', label: 'Melayu', name: 'Malay' },
  { locale: 'nl', label: 'Nederlands', name: 'Dutch' },
  { locale: 'no', label: 'Norsk', name: 'Norwegian' },
  { locale: 'pl', label: 'Polskie', name: 'Polish' },
  { locale: 'pt', label: 'Português', name: 'Portuguese' },
  { locale: 'pt-PT', label: 'Português (Portugal)', name: 'Portuguese (Portugal)' },
  { locale: 'ru', label: 'Русский', name: 'Russian' },
  { locale: 'sv', label: 'Svenska', name: 'Swedish' },
  { locale: 'th', label: 'ไทย', name: 'Thai' },
  { locale: 'tr', label: 'Türkçe', name: 'Turkish' },
  { locale: 'vi', label: 'Tiếng Việt', name: 'Vietnamese' },
  { locale: 'zh', label: '中文 (简)', name: 'Chinese (Simplified)' },
  { locale: 'zh-TW', label: '中文 (繁)', name: 'Chinese (Traditional)' },
];

// Used for Language Tool (not all are listed)
// https://languagetool.org/http-api/swagger-ui/#!/default/get_languages
export const LT_LOCALES: LocaleDefinition[] = [
  { locale: 'ca-ES', label: 'Català', name: 'Catalan' },
  { locale: 'ca-ES-valencia', label: 'Català (Valencià)', name: 'Catalan' },
  { locale: 'da-DK', label: 'Dansk', name: 'Danish' },
  { locale: 'de-AT', label: 'Deutsch (Österreich)', name: 'German (Austria)' },
  { locale: 'de-DE', label: 'Deutsch (Deutschland)', name: 'German (Germany)' },
  { locale: 'el', label: 'Ελληνικά', name: 'Greek' },
  { locale: 'en-AU', label: 'English (Australia)' },
  { locale: 'en-CA', label: 'English (Canada)' },
  { locale: 'en-GB', label: 'English (Great Britain)' },
  { locale: 'en-NZ', label: 'English (New Zealand)' },
  { locale: 'en-US', label: 'English (United States)' },
  { locale: 'es', label: 'Español (España)', name: 'Spanish (Spain)' },
  { locale: 'fr', label: 'Français', name: 'French' },
  { locale: 'it', label: 'Italiano', name: 'Italian' },
  { locale: 'ja-JP', label: '日本語', name: 'Japanese' },
  // Korean 한국어
  // Malay Melayu
  { locale: 'nl', label: 'Nederlands', name: 'Dutch' },
  { locale: 'pl-PL', label: 'Polskie', name: 'Polish' },
  { locale: 'pt-PT', label: 'Português (Portugal)', name: 'Portuguese (Portugal)' },
  { locale: 'pt-BR', label: 'Português (Brasil)', name: 'Portuguese (Brazil)' },
  { locale: 'ro-RO', label: 'Română', name: 'Romanian' },
  { locale: 'ru-RU', label: 'Русский', name: 'Russian' },
  { locale: 'sv', label: 'Svenska', name: 'Swedish' },
  // Turkish Türkçe
  { locale: 'uk-UA', label: 'Українська', name: 'Ukrainian' },
  { locale: 'zh-CN', label: '中文 (简)', name: 'Chinese (Simplified)' },
];

// DATE/TIME
export const FORMAT_YMD = 'yyyy-MM-dd';
export const FORMAT_PREFIX_DAY = 'ccc'; // Sun
export const FORMAT_SUFFIX_TIMEZONE = 'ZZZZ'; // PST

// MISC
export const MICROS = 1000000;

// THEMES
export const STATUSES = ['notice', 'info', 'success', 'warning', 'danger', 'muted'];
export const BRANDS = ['luxury', 'plus'];
export const Z_INDEX_MODAL = 2000;
export const Z_INDEX_PORTAL = 2000; // Same as Modal to fix Tooltip in Modal
export const Z_INDEX_LIGHTBOX = 2004; // Lightbox is full screen and appears on top of everything else
export const Z_INDEX_TOAST = 3000;

// EMOJIS
export const EMOJI_WHITELIST = [
  '1F600', // 😀 grinning face
  '1F60A', // 😊 smiling face with smiling eyes
  '1F642', // 🙂 slightly smiling face
  '1F389', // 🎉 party popper
  '2728', // ✨ sparkles
  '1F334', // 🌴 palm tree
  '1F333', // 🌳 deciduous tree
  '1F335', // 🌵 cactus
  '2600', // ☀️ sun
  '2744', // ❄️ snowflake
  '1F3E0', // 🏠️ house
  '1F697', // 🚗 automobile
  '2708', // ✈️ airplane
  '1F682', // 🚂 locomotive
  '26F5', // ⛵️ sailboat
];

// REACT
export const PASSTHROUGH_WRAPPER_NAMES = ['Tooltip', 'Permission', 'Trebuchet', 'ERF', 'Memo'];
export const STRIP_HOC_NAMES = ['Memo', 'Proxy', 'withStyles', 'withTheme', 'connect'];
