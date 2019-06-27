import React from 'react';
import Core from '../..';
import { TranslateParams, TranslateProps } from '../../types';

export type Props = TranslateProps;

/** Translate a phrase with a context and dynamic params. */
export default class Translate extends React.PureComponent<Props> {
  static defaultProps = {
    html: false,
  };

  static phrase(phrase: string, params: TranslateParams, context: string): string {
    return Core.translate(phrase, params, context);
  }

  render() {
    const { translatorComponent: Translator } = Core.settings;
    const { children, phrase, context, ...params } = this.props;

    if (!Translator) {
      return <span>{Core.translate(phrase, params as any, context)}</span>;
    }

    return <Translator phrase={phrase} context={context} {...(params as any)} />;
  }
}
