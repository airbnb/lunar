import React from 'react';
import CheckBoxController, {
  CheckBoxControllerProps,
} from '@airbnb/lunar/lib/components/CheckBoxController';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `CheckBoxController` automatically connected to the parent `Form`.  */
export default function FormCheckBoxController(
  props: FieldProps<string[], CheckBoxControllerProps>,
) {
  const fieldProps = useFormField(props, {
    initialValue: [],
    multiple: true,
    parse: toString,
  });

  return <CheckBoxController {...fieldProps} />;
}
