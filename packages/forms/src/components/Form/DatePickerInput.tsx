import React from 'react';
import BaseDatePickerInput, { Props } from '@airbnb/lunar/lib/components/DatePickerInput';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `DatePickerInput` automatically connected to the parent `Form`.  */
export function FormDatePickerInput({
  // Blur and focus events provided by `final-form` break the picker
  // overlay, so let's omit them for now, as it isn't an easy fix.
  onBlur,
  onFocus,
  ...props
}: Props & ConnectToFormProps<string>) {
  return <BaseDatePickerInput {...props} />;
}

export default connectToForm<string>({
  initialValue: '',
  parse: toString,
})(FormDatePickerInput);
