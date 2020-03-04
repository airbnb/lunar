import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import BaseInput, { BaseInputProps } from '../private/BaseInput';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';

export type InputProps = Omit<BaseInputProps, 'id'> & FormFieldProps;

/** A controlled input field. */
export default function Input(props: InputProps) {
  const { fieldProps, inputProps } = partitionFieldProps(props);
  const [id] = useState(() => uuid());

  if (inputProps.type === 'hidden') {
    return <BaseInput {...inputProps} hidden optional id={id} />;
  }

  return (
    <FormField {...fieldProps} id={id}>
      <BaseInput type="text" {...inputProps} id={id} />
    </FormField>
  );
}
