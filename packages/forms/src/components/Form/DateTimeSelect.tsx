import React from 'react';
import BaseDateTimeSelect, { Props } from '@airbnb/lunar/lib/components/DateTimeSelect';
import useFormField, { FieldProps } from '../../hooks/useFormField';
import { toString } from '../../helpers';

/** `DateTimeSelect` automatically connected to the parent `Form`.  */
export default function FormDateTimeSelect(props: Props & FieldProps<string>) {
  const fieldProps = useFormField<string, Props>(props, {
    initialValue: new Date().toISOString(),
    parse: toString,
  });

  return <BaseDateTimeSelect {...fieldProps} />;
}
