import React from 'react';
import BaseMulticomplete, { Props, Item } from '@airbnb/lunar/lib/components/Multicomplete';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `Multicomplete` automatically connected to the parent `Form`.  */
export default function FormMulticomplete<T extends Item = Item>(
  props: Props<T> & FieldProps<string[]>,
) {
  const fieldProps = useFormField<string[], Props<T>>(props, {
    initialValue: [],
    multiple: true,
    parse: toString,
  });

  return <BaseMulticomplete<T> {...fieldProps} />;
}
