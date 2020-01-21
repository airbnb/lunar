import T from '@airbnb/lunar/lib/components/Translate';
import { MENU_PREVIEW } from '../constants';
import { ProofreadConfig, WritableContext } from '../types';

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

export const AIRBNB_REGEX = /\b(((air|ari|iar)[bn]{3})(?!\.com))\b/gi;

export function checkForAirbnbErrors(text: string): ProofreadConfig[] {
  const customErrors: ProofreadConfig[] = [];

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

export function onSubmitShowPreview(result: unknown, context: WritableContext) {
  // Preview has been confirmed so pass through submit handlers
  // and reset the current preview state.
  if (context.data.previewConfirmed) {
    context.setMenu('');
    context.setData('previewConfirmed', false);

    return false;
  }

  context.setMenu(menu => (menu === MENU_PREVIEW ? '' : MENU_PREVIEW));

  // Abort so subsequent submit handlers are not called
  return true;
}
