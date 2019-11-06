import React from 'react';
import BaseAutocomplete, { Props, Item } from '@airbnb/lunar/lib/components/Autocomplete';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `Autocomplete` automatically connected to the parent `Form`. */
export default function FormAutocomplete<T extends Item = Item>(
  props: Props<T> & FieldProps<string>,
) {
  const fieldProps = useFormField<string, Props<T>>(props, {
    initialValue: '',
    parse: toString,
  });

  return <BaseAutocomplete<T> {...fieldProps} />;
}
