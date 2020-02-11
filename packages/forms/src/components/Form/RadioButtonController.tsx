import React from 'react';
import RadioButtonController, {
  RadioButtonControllerProps,
} from '@airbnb/lunar/lib/components/RadioButtonController';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `RadioButtonController` automatically connected to the parent `Form`.  */
export default function FormRadioButtonController(
  props: FieldProps<string, RadioButtonControllerProps>,
) {
  const fieldProps = useFormField(props, {
    initialValue: '',
    parse: toString,
  });

  return <RadioButtonController {...fieldProps} />;
}
