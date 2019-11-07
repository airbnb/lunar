import React from 'react';
import Select, { Props } from '@airbnb/lunar/lib/components/Select';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `Select` automatically connected to the parent `Form`.  */
export default function FormSelect(props: FieldProps<string, Props>) {
  const fieldProps = useFormField(props, {
    initialValue: '',
    parse: toString,
  });

  return <Select {...fieldProps} />;
}
