import React from 'react';
import BaseDatePickerInput, { Props } from '@airbnb/lunar/lib/components/DatePickerInput';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `DatePickerInput` automatically connected to the parent `Form`.  */
export function FormDatePickerInput({
  // Blur and focus events provided by `final-form` break the picker
  // overlay, so let's omit them for now, as it isn't an easy fix.
  // Luckily, we can get away with this as it's mostly used for
  // validation purposes, and dates are deterministic.
  onBlur,
  onFocus,
  ...props
}: Props & ConnectToFormProps<string | Date>) {
  return <BaseDatePickerInput {...props} />;
}

export default connectToForm<string | Date>({
  initialValue: '',
})(FormDatePickerInput);
