import React from 'react';
import Core from '../..';
import {
  TranslateParams,
  TranslateProps as BaseTranslateProps,
  TranslateOptions,
} from '../../types';

export type TranslateProps = BaseTranslateProps;

/** Translate a phrase with a key and dynamic params. */
export default class Translate extends React.PureComponent<TranslateProps> {
  static defaultProps = {
    html: false,
  };

  static phrase(key: string, phrase: string, params?: TranslateParams): string {
    return Core.translate(key, phrase, params);
  }

  render() {
    const { translatorComponent: Translator } = Core.settings;
    const { children, k: key, phrase, html, ...params } = this.props;
    const options: TranslateOptions = { html };

    if (!Translator) {
      return <span>{Core.translate(key, phrase, params as TranslateParams, options)}</span>;
    }

    return <Translator k={key} phrase={phrase} html={html} {...(params as {})} />;
  }
}
