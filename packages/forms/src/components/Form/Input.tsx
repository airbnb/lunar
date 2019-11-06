import React from 'react';
import BaseInput, { Props } from '@airbnb/lunar/lib/components/Input';
import { toString } from '../../helpers';
import useFormField, { FieldProps } from '../../hooks/useFormField';

/** `Input` automatically connected to the parent `Form`.  */
export default function FormInput(props: Props & FieldProps<string>) {
  const fieldProps = useFormField<string, Props>(props, {
    initialValue: '',
    parse: toString,
  });

  return <BaseInput {...fieldProps} />;
}
