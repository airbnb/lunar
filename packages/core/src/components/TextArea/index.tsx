import React from 'react';
import uuid from 'uuid/v4';
import { Omit } from 'utility-types';
import PropTypes from 'prop-types';
import { requiredBy } from 'airbnb-prop-types';
import BaseTextArea, { Props as BaseTextAreaProps } from '../private/BaseTextArea';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';
import T from '../Translate';
import Proofreader, { Props as ProofreaderProps } from './Proofreader';
import { Props as MarkProps } from './Proofreader/Mark';

export type Props = Omit<BaseTextAreaProps, 'id'> &
  FormFieldProps &
  Partial<Pick<ProofreaderProps, 'locale' | 'onCheckText' | 'secondaryMark'>> &
  Partial<Pick<MarkProps, 'alwaysHighlight'>> & {
    /** Max characters allowed in this field. Will populate `labelDescription` with the current usage. */
    maxLength?: number;
    /** Add "notranslate" className to prevent Google Chrome translation. */
    noTranslate?: boolean;
    /** Enable proofreader to run spelling and grammar checks. */
    proofread?: boolean;
  };

export type State = {
  id: string;
};

/** A controlled textarea field. */
export default class TextArea extends React.Component<Props, State> {
  static propTypes = {
    onCheckText: requiredBy('proofread', PropTypes.func),
  };

  static defaultProps = {
    alwaysHighlight: false,
    locale: 'none',
    noTranslate: false,
    proofread: false,
    secondaryMark: false,
  };

  state = {
    id: uuid(),
  };

  render() {
    const { fieldProps, inputProps } = partitionFieldProps(this.props);
    const { locale, proofread, alwaysHighlight, secondaryMark, ...textareaProps } = inputProps;
    const { id } = this.state;
    const description =
      fieldProps.labelDescription ||
      (inputProps.maxLength && (
        <T
          k="lunar.form.charsUsed"
          phrase="%{current}/%{max} characters used"
          current={inputProps.value!.length.toLocaleString()}
          max={inputProps.maxLength.toLocaleString()}
          context="Showing the current and max characters within a form textarea"
        />
      ));

    return (
      <FormField {...fieldProps} id={id} labelDescription={description}>
        {proofread ? (
          <Proofreader
            {...(textareaProps as any)}
            id={id}
            locale={locale}
            alwaysHighlight={alwaysHighlight}
            secondaryMark={secondaryMark}
          />
        ) : (
          <BaseTextArea {...textareaProps} id={id} />
        )}
      </FormField>
    );
  }
}
