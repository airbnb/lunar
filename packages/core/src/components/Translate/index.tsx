import React from 'react';
import Core from '../..';
import {
  TranslateParams,
  TranslateProps as BaseTranslateProps,
  TranslateOptions,
} from '../../types';

export type TranslateProps = BaseTranslateProps;

/** Translate a phrase with a key and dynamic params. */
function Translate({ children, k: key, phrase, html, ...params }: TranslateProps) {
  const { translatorComponent: Translator } = Core.settings;
  const options: TranslateOptions = { html };

  if (!Translator) {
    return <span>{Core.translate(key, phrase, params as TranslateParams, options)}</span>;
  }

  return <Translator k={key} phrase={phrase} html={html} {...(params as {})} />;
}

Translate.phrase = function phrase(key: string, msg: string, params?: TranslateParams): string {
  return Core.translate(key, msg, params);
};

export default Translate;
