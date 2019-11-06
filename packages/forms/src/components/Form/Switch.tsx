import React from 'react';
import BaseSwitch, { Props } from '@airbnb/lunar/lib/components/Switch';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toBool } from '../../helpers';

/** `Switch` automatically connected to the parent `Form`.  */
export default function FormSwitch(props: Props & FieldProps<boolean>) {
  const fieldProps = useFormField<boolean, Props>(props, {
    initialValue: false,
    parse: toBool,
    valueProp: 'checked',
  });

  return <BaseSwitch {...fieldProps} />;
}
