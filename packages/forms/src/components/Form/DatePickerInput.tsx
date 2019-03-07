import React from 'react';
import BaseDatePickerInput, { Props } from '@airbnb/lunar/lib/components/DatePickerInput';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `DatePickerInput` automatically connected to the parent `Form`.  */
export function FormDatePickerInput(props: Props & ConnectToFormProps) {
  return <BaseDatePickerInput {...props} />;
}

export default connectToForm()(FormDatePickerInput);
