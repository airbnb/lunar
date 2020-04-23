import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import BaseInputRange, { BaseInputRangeProps } from '../private/BaseInputRange';
import { IgnoreAttributes } from '../private/FormInput';

export type RangeProps = Omit<BaseInputRangeProps, 'id'> &
  FormFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, IgnoreAttributes>;

/** A controlled range input. */
export default function Range(props: RangeProps) {
  const { fieldProps, inputProps } = partitionFieldProps(props);
  const [id] = useState(() => uuid());

  return (
    <FormField {...fieldProps} id={id}>
      {/** inputProps.value is a string, we need a number */}
      <BaseInputRange {...inputProps} value={props.value} id={id} />
    </FormField>
  );
}
