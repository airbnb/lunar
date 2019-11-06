import React from 'react';
import BaseTextArea, { Props } from '@airbnb/lunar/lib/components/TextArea';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `TextArea` automatically connected to the parent `Form`.  */
export default function FormTextArea(props: Props & FieldProps<string>) {
  const fieldProps = useFormField<string, Props>(props, {
    initialValue: '',
    parse: toString,
  });

  return <BaseTextArea {...fieldProps} />;
}
