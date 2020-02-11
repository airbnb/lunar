import React from 'react';
import TextArea, { TextAreaProps } from '@airbnb/lunar/lib/components/TextArea';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `TextArea` automatically connected to the parent `Form`.  */
export default function FormTextArea(props: FieldProps<string, TextAreaProps>) {
  const fieldProps = useFormField(props, {
    initialValue: '',
    parse: toString,
  });

  return <TextArea {...fieldProps} />;
}
