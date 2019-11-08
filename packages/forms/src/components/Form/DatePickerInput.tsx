import React from 'react';
import DatePickerInput, { Props } from '@airbnb/lunar/lib/components/DatePickerInput';
import useFormField, { FieldProps } from '../../hooks/useFormField';

function wrapHandler<T>(cb: (event: T) => void) {
  return (event: T) => {
    setTimeout(() => {
      cb(event);
    }, 0);
  };
}

/** `DatePickerInput` automatically connected to the parent `Form`.  */
export default function FormDatePickerInput(props: FieldProps<string | Date, Props>) {
  const { onBlur, onFocus, ...fieldProps } = useFormField(props, {
    initialValue: '',
  });

  return (
    <DatePickerInput {...fieldProps} onBlur={wrapHandler(onBlur)} onFocus={wrapHandler(onFocus)} />
  );
}
