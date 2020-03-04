import React from 'react';
import Select, { SelectProps } from '@airbnb/lunar/lib/components/Select';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `Select` automatically connected to the parent `Form`.  */
export default function FormSelect<T extends string = string>(
  props: FieldProps<T, SelectProps<T>>,
) {
  const fieldProps = useFormField(props, {
    initialValue: '' as T,
    parse: toString,
  });

  return <Select<T> {...fieldProps} />;
}
