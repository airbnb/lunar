import React from 'react';
import BaseToggleButtonController, {
  Props,
} from '@airbnb/lunar/lib/components/ToggleButtonController';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `ToggleButtonController` automatically connected to the parent `Form`.  */
export default function FormToggleButtonController(props: Props & FieldProps<string>) {
  const fieldProps = useFormField<string, Props>(props, {
    initialValue: '',
    parse: toString,
  });

  return <BaseToggleButtonController {...fieldProps} />;
}
