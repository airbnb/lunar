import React from 'react';
import BaseTextArea, { Props } from '@airbnb/lunar/lib/components/TextArea';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `TextArea` automatically connected to the parent `Form`.  */
export function FormTextArea(props: Props & ConnectToFormProps) {
  return <BaseTextArea {...props} />;
}

export default connectToForm()(FormTextArea);
