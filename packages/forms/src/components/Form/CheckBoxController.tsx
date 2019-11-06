import React from 'react';
import BaseCheckBoxController, { Props } from '@airbnb/lunar/lib/components/CheckBoxController';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `CheckBoxController` automatically connected to the parent `Form`.  */
export default function FormCheckBoxController(props: Props & FieldProps<string[]>) {
  const fieldProps = useFormField<string[], Props>(props, {
    initialValue: [],
    multiple: true,
    parse: toString,
  });

  return <BaseCheckBoxController {...fieldProps} />;
}
