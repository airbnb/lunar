import React from 'react';
import BaseDateTimeSelect, { Props } from '@airbnb/lunar/lib/components/DateTimeSelect';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `DateTimeSelect` automatically connected to the parent `Form`.  */
export function FormDateTimeSelect(props: Props & ConnectToFormProps) {
  return <BaseDateTimeSelect {...props} />;
}

export default connectToForm({
  initialValue: new Date().toISOString(),
})(FormDateTimeSelect);
