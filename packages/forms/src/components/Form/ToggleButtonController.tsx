import React from 'react';
import ToggleButtonController, { Props } from '@airbnb/lunar/lib/components/ToggleButtonController';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `ToggleButtonController` automatically connected to the parent `Form`.  */
export default function FormToggleButtonController(props: FieldProps<string, Props>) {
  const fieldProps = useFormField(props, {
    initialValue: '',
    parse: toString,
  });

  return <ToggleButtonController {...fieldProps} />;
}
