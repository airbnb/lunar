import React from 'react';
import BaseFileInput, { Props } from '@airbnb/lunar/lib/components/FileInput';
import useFormField, { FieldProps } from '../../hooks/useFormField';

/** `FileInput` automatically connected to the parent `Form`.  */
export default function FormFileInput(props: FieldProps<File[], Props>) {
  const fieldProps = useFormField(props, {
    initialValue: [],
    ignoreValue: true,
  });

  return <BaseFileInput {...fieldProps} />;
}
