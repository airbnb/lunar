import React from 'react';
import RadioButtonController, {
  RadioButtonControllerProps,
} from '@airbnb/lunar/lib/components/RadioButtonController';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `RadioButtonController` automatically connected to the parent `Form`.  */
export default function FormRadioButtonController<T extends string = string>(
  props: FieldProps<T, RadioButtonControllerProps<T>>,
) {
  const fieldProps = useFormField(props, {
    initialValue: '' as T,
    parse: toString,
  });

  return <RadioButtonController<T> {...fieldProps} />;
}
