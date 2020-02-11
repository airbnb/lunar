import React from 'react';
import Switch, { SwitchProps } from '@airbnb/lunar/lib/components/Switch';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toBool } from '../../helpers';

/** `Switch` automatically connected to the parent `Form`.  */
export default function FormSwitch(props: FieldProps<boolean, SwitchProps>) {
  const fieldProps = useFormField(props, {
    initialValue: false,
    parse: toBool,
    valueProp: 'checked',
  });

  return <Switch {...fieldProps} />;
}
