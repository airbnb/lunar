import React from 'react';
import BaseSelect, { Props } from '@airbnb/lunar/lib/components/Select';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `Select` automatically connected to the parent `Form`.  */
export default function FormSelect(props: Props & FieldProps<string>) {
  const fieldProps = useFormField<string, Props>(props, {
    initialValue: '',
    parse: toString,
  });

  return <BaseSelect {...fieldProps} />;
}
