import React from 'react';
import BaseCheckBoxController, { Props } from '@airbnb/lunar/lib/components/CheckBoxController';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `CheckBoxController` automatically connected to the parent `Form`.  */
export function FormCheckBoxController(props: Props & ConnectToFormProps<string[]>) {
  return <BaseCheckBoxController {...props} />;
}

export default connectToForm<string[]>({
  initialValue: [],
  multiple: true,
  parse: toString,
})(FormCheckBoxController);
