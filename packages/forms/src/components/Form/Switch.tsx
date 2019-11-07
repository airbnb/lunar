import React from 'react';
import Switch, { Props } from '@airbnb/lunar/lib/components/Switch';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toBool } from '../../helpers';

/** `Switch` automatically connected to the parent `Form`.  */
export default function FormSwitch(props: FieldProps<boolean, Props>) {
  const fieldProps = useFormField(props, {
    initialValue: false,
    parse: toBool,
    valueProp: 'checked',
  });

  return <Switch {...fieldProps} />;
}
