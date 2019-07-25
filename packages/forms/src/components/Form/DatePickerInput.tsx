import React from 'react';
import BaseDatePickerInput, { Props } from '@airbnb/lunar/lib/components/DatePickerInput';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `DatePickerInput` automatically connected to the parent `Form`.  */
export function FormDatePickerInput(props: Props & ConnectToFormProps<string>) {
  return <BaseDatePickerInput {...props} />;
}

export default connectToForm<string>({
  initialValue: '',
  parse: toString,
})(FormDatePickerInput);
