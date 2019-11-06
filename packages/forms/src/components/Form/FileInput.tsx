import React from 'react';
import BaseFileInput, { Props } from '@airbnb/lunar/lib/components/FileInput';
import useFormField, { FieldProps } from '../../hooks/useFormField';

/** `FileInput` automatically connected to the parent `Form`.  */
export default function FormFileInput(props: Props & FieldProps<File[]>) {
  const fieldProps = useFormField<File[], Props>(props, {
    initialValue: [],
    ignoreValue: true,
  });

  return <BaseFileInput {...fieldProps} />;
}
