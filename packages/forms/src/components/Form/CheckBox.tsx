import React from 'react';
import BaseCheckBox, { Props } from '@airbnb/lunar/lib/components/CheckBox';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toBool } from '../../helpers';

/** `CheckBox` automatically connected to the parent `Form`.  */
export default function FormCheckBox(props: Props & FieldProps<boolean>) {
  const fieldProps = useFormField<boolean, Props>(props, {
    initialValue: false,
    parse: toBool,
    valueProp: 'checked',
  });

  return <BaseCheckBox {...fieldProps} />;
}
