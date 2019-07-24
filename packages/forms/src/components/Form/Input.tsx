import React from 'react';
import BaseInput, { Props } from '@airbnb/lunar/lib/components/Input';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `Input` automatically connected to the parent `Form`.  */
export function FormInput(props: Props & ConnectToFormProps<string>) {
  return <BaseInput {...props} />;
}

export default connectToForm<string>({
  initialValue: '',
  parse: toString,
})(FormInput);
