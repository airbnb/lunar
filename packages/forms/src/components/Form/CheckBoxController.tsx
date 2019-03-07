import React from 'react';
import BaseCheckBoxController, { Props } from '@airbnb/lunar/lib/components/CheckBoxController';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `CheckBoxController` automatically connected to the parent `Form`.  */
export function FormCheckBoxController(props: Props & ConnectToFormProps) {
  return <BaseCheckBoxController {...props} />;
}

export default connectToForm({
  multiple: true,
})(FormCheckBoxController);
