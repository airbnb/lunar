import React from 'react';
import BaseTextArea, { Props } from '@airbnb/lunar/lib/components/TextArea';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `TextArea` automatically connected to the parent `Form`.  */
export default function FormTextArea(props: FieldProps<string, Props>) {
  const fieldProps = useFormField(props, {
    initialValue: '',
    parse: toString,
  });

  return <BaseTextArea {...fieldProps} />;
}
