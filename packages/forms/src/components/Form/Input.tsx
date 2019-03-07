import React from 'react';
import BaseInput, { Props } from '@airbnb/lunar/lib/components/Input';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `Input` automatically connected to the parent `Form`.  */
export function FormInput(props: Props & ConnectToFormProps) {
  return <BaseInput {...props} />;
}

export default connectToForm()(FormInput);
