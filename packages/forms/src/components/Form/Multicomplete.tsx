import React from 'react';
import Multicomplete, {
  MulticompleteProps,
  Item,
} from '@airbnb/lunar/lib/components/Multicomplete';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `Multicomplete` automatically connected to the parent `Form`.  */
export default function FormMulticomplete<T extends Item = Item>(
  props: FieldProps<string[], MulticompleteProps<T>>,
) {
  const fieldProps = useFormField(props, {
    initialValue: [],
    multiple: true,
    parse: toString,
  });

  return <Multicomplete<T> {...fieldProps} />;
}
