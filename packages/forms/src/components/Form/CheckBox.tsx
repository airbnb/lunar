import React from 'react';
import BaseCheckBox, { Props } from '@airbnb/lunar/lib/components/CheckBox';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toBool } from '../../helpers';

/** `CheckBox` automatically connected to the parent `Form`.  */
export function FormCheckBox(props: Props & ConnectToFormProps<boolean>) {
  return <BaseCheckBox {...props} />;
}

export default connectToForm<boolean>({
  initialValue: false,
  parse: toBool,
  valueProp: 'checked',
})(FormCheckBox);
