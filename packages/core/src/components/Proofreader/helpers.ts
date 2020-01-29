import T from '../Translate';
import { DEFAULT_LOCALE, LT_LOCALES } from '../../constants';
import { LOCALE_TO_LT_LOCALE, NO_LOCALE, AUTO_DETECT_LOCALE, AIRBNB_REGEX } from './constants';
import { LocaleDefinition } from '../../types';
import { ProofreadRuleMatch } from './types';

export function selectAppropriateLocale(
  baseLocale: string = DEFAULT_LOCALE,
): {
  selectedLocale: string;
  unsupportedLocale: string | null;
} {
  const locale = LOCALE_TO_LT_LOCALE[baseLocale!] || baseLocale || '';
  const possibleMatches: LocaleDefinition[] = [];
  let match: string | null = null;

  if (locale === NO_LOCALE) {
    match = NO_LOCALE;
  } else if (locale === AUTO_DETECT_LOCALE) {
    match = AUTO_DETECT_LOCALE;
  } else {
    LT_LOCALES.some(definition => {
      if (locale === definition.locale) {
        match = definition.locale;

        return true;
      }

      if (locale.length === 2 && definition.locale.indexOf(locale) === 0) {
        possibleMatches.push(definition);
      }

      return false;
    });

    if (!match && possibleMatches.length > 0) {
      match = possibleMatches[0].locale;
    }
  }

  return {
    selectedLocale: match!,
    unsupportedLocale: match ? null : locale,
  };
}

export function getLocaleDefinition(locale: string): LocaleDefinition {
  if (locale === NO_LOCALE) {
    return {
      locale,
      label: T.phrase(
        'No language selected',
        {},
        {
          context: 'No language selected for spell and grammar checking',
          key: 'composer.proofreader.noLanguageSelected',
        },
      ),
    };
  }

  if (locale === AUTO_DETECT_LOCALE) {
    return {
      locale,
      label: T.phrase(
        'Auto-detect language',
        {},
        {
          context: 'Auto-detect language for spell and grammar checking',
          key: 'composer.proofreader.autoDetectLanguage',
        },
      ),
    };
  }

  return LT_LOCALES.find(definition => definition.locale === locale)!;
}

export function checkForAirbnbErrors(text: string): ProofreadRuleMatch[] {
  const customErrors: ProofreadRuleMatch[] = [];

  if (!text) {
    return customErrors;
  }

  let match = AIRBNB_REGEX.exec(text);

  while (match) {
    if (match[0] !== 'Airbnb') {
      customErrors.push({
        short_message: '',
        message: T.phrase(
          'Improper company spelling or casing',
          {},
          {
            context: 'Error message when Airbnb is used incorrectly',
            key: 'lunar.proofreader.misspellingLabel',
          },
        ),
        offset: AIRBNB_REGEX.lastIndex - match[0].length,
        length: match[0].length,
        found: match[0],
        replacements: ['Airbnb'],
        rule_id: 'AIRBNB_SPELLING_OR_CASING',
      });
    }

    match = AIRBNB_REGEX.exec(text);
  }

  return customErrors;
}
