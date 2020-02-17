import React, { useState } from 'react';
import uuid from 'uuid/v4';
import PropTypes from 'prop-types';
import { requiredBy } from 'airbnb-prop-types';
import BaseTextArea, { BaseTextAreaProps } from '../private/BaseTextArea';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import T from '../Translate';
import Proofreader, { ProofreaderProps } from '../Proofreader';
import { ExtraProofreadProps } from '../Proofreader/types';

export type TextAreaProps = Omit<BaseTextAreaProps, 'id'> &
  FormFieldProps &
  Partial<Pick<ProofreaderProps, 'locale' | 'onCheckText'>> & {
    /** Max characters allowed in this field. Will populate `labelDescription` with the current usage. */
    maxLength?: number;
    /** Add "notranslate" className to prevent Google Chrome translation. */
    noTranslate?: boolean;
    /** Enable proofreader to run spelling and grammar checks. */
    proofread?: boolean;
    /** Additional props that determine more proofreader functionality */
    proofreadProps?: ExtraProofreadProps;
  };

/** A controlled textarea field. */
function TextArea(props: TextAreaProps) {
  const { fieldProps, inputProps } = partitionFieldProps(props);
  const { locale, name, proofread, proofreadProps, onCheckText, ...textareaProps } = inputProps;
  const [id] = useState(() => uuid());
  const description =
    fieldProps.labelDescription ||
    (inputProps.maxLength && (
      <T
        k="lunar.form.charsUsed"
        phrase="%{current}/%{max} characters used"
        current={inputProps.value!.length.toLocaleString()}
        max={inputProps.maxLength.toLocaleString()}
      />
    ));

  return (
    <FormField {...fieldProps} id={id} labelDescription={description}>
      {proofread && onCheckText ? (
        <Proofreader
          {...textareaProps}
          {...proofreadProps}
          id={id}
          locale={locale}
          name={name!}
          onCheckText={onCheckText}
        />
      ) : (
        <BaseTextArea {...textareaProps} id={id} name={name} />
      )}
    </FormField>
  );
}

TextArea.propTypes = {
  onCheckText: requiredBy('proofread', PropTypes.func),
};

export default TextArea;
