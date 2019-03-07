import React from 'react';
import BaseFileInput, { Props } from '@airbnb/lunar/lib/components/FileInput';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `FileInput` automatically connected to the parent `Form`.  */
export function FormFileInput(props: Props & ConnectToFormProps) {
  return <BaseFileInput {...props} />;
}

export default connectToForm({
  ignoreValue: true,
  parse: files => files,
})(FormFileInput);
