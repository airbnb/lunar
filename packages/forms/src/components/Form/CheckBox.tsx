import React from 'react';
import CheckBox, { Props } from '@airbnb/lunar/lib/components/CheckBox';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toBool } from '../../helpers';

/** `CheckBox` automatically connected to the parent `Form`.  */
export default function FormCheckBox(props: FieldProps<boolean, Props>) {
  const fieldProps = useFormField(props, {
    initialValue: false,
    parse: toBool,
    valueProp: 'checked',
  });

  return <CheckBox {...fieldProps} />;
}
