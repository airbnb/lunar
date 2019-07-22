import React from 'react';
import BaseTextArea, { Props } from '@airbnb/lunar/lib/components/TextArea';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `TextArea` automatically connected to the parent `Form`.  */
export function FormTextArea(props: Props & ConnectToFormProps<string>) {
  return <BaseTextArea {...props} />;
}

export default connectToForm<string>({
  initialValue: '',
  parse: toString,
})(FormTextArea);
