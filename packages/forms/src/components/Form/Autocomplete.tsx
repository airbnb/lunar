import React from 'react';
import Autocomplete, { AutocompleteProps, Item } from '@airbnb/lunar/lib/components/Autocomplete';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `Autocomplete` automatically connected to the parent `Form`. */
export default function FormAutocomplete<T extends Item = Item>(
  props: FieldProps<string, AutocompleteProps<T>>,
) {
  const fieldProps = useFormField(props, {
    initialValue: '',
    parse: toString,
  });

  return <Autocomplete<T> {...fieldProps} />;
}
