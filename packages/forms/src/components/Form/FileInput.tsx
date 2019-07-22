import React from 'react';
import BaseFileInput, { Props } from '@airbnb/lunar/lib/components/FileInput';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `FileInput` automatically connected to the parent `Form`.  */
export function FormFileInput(props: Props & ConnectToFormProps<File[]>) {
  return <BaseFileInput {...props} />;
}

export default connectToForm<File[]>({
  initialValue: [],
  ignoreValue: true,
  // This isn't used since we ignore the value,
  // but is required by the types.
  parse: value => value as any,
})(FormFileInput);
