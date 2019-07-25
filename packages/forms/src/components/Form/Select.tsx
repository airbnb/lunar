import React from 'react';
import BaseSelect, { Props } from '@airbnb/lunar/lib/components/Select';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `Select` automatically connected to the parent `Form`.  */
export function FormSelect(props: Props & ConnectToFormProps<string>) {
  return <BaseSelect {...props} />;
}

export default connectToForm<string>({
  initialValue: '',
  parse: toString,
})(FormSelect);
