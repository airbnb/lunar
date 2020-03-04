import React from 'react';
import CheckBox, { CheckBoxProps } from '@airbnb/lunar/lib/components/CheckBox';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toBool } from '../../helpers';

/** `CheckBox` automatically connected to the parent `Form`.  */
export default function FormCheckBox<T extends string = string>(
  props: FieldProps<boolean, CheckBoxProps<T>>,
) {
  const fieldProps = useFormField(props, {
    initialValue: false,
    parse: toBool,
    valueProp: 'checked',
  });

  return <CheckBox<T> {...fieldProps} />;
}
