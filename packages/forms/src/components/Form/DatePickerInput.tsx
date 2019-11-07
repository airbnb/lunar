import React from 'react';
import DatePickerInput, { Props } from '@airbnb/lunar/lib/components/DatePickerInput';
import useFormField, { FieldProps } from '../../hooks/useFormField';

/** `DatePickerInput` automatically connected to the parent `Form`.  */
export default function FormDatePickerInput(
  // Blur and focus events provided by `final-form` break the picker
  // overlay, so let's omit them for now, as it isn't an easy fix.
  // Luckily, we can get away with this as it's mostly used for
  // validation purposes, and dates are deterministic.
  // onBlur,
  // onFocus,
  props: FieldProps<string | Date, Props>,
) {
  const fieldProps = useFormField(props, {
    initialValue: '',
  });

  return <DatePickerInput {...fieldProps} />;
}
