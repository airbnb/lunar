import React from 'react';
import BaseDateTimeSelect, { Props } from '@airbnb/lunar/lib/components/DateTimeSelect';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `DateTimeSelect` automatically connected to the parent `Form`.  */
export function FormDateTimeSelect(props: Props & ConnectToFormProps<string>) {
  return <BaseDateTimeSelect {...props} />;
}

export default connectToForm<string>({
  initialValue: new Date().toISOString(),
  parse: toString,
})(FormDateTimeSelect);
