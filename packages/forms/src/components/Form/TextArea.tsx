import React from 'react';
import TextArea, { Props } from '@airbnb/lunar/lib/components/TextArea';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `TextArea` automatically connected to the parent `Form`.  */
export default function FormTextArea(props: FieldProps<string, Props>) {
  const fieldProps = useFormField(props, {
    initialValue: '',
    parse: toString,
  });

  return <TextArea {...fieldProps} />;
}
