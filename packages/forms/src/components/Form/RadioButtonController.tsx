import React from 'react';
import RadioButtonController, { Props } from '@airbnb/lunar/lib/components/RadioButtonController';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `RadioButtonController` automatically connected to the parent `Form`.  */
export default function FormRadioButtonController(props: FieldProps<string, Props>) {
  const fieldProps = useFormField(props, {
    initialValue: '',
    parse: toString,
  });

  return <RadioButtonController {...fieldProps} />;
}
