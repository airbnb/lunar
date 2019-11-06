import React from 'react';
import BaseRadioButtonController, {
  Props,
} from '@airbnb/lunar/lib/components/RadioButtonController';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `RadioButtonController` automatically connected to the parent `Form`.  */
export default function FormRadioButtonController(props: Props & FieldProps<string>) {
  const fieldProps = useFormField<string, Props>(props, {
    initialValue: '',
    parse: toString,
  });

  return <BaseRadioButtonController {...fieldProps} />;
}
