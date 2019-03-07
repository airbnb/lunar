import React from 'react';
import BaseSelect, { Props } from '@airbnb/lunar/lib/components/Select';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `Select` automatically connected to the parent `Form`.  */
export function FormSelect(props: Props & ConnectToFormProps) {
  return <BaseSelect {...props} />;
}

export default connectToForm()(FormSelect);
