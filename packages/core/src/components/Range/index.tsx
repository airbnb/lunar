import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import BaseRange, { BaseRangeProps } from './BaseRange';
import { IgnoreAttributes } from '../private/FormInput';

export type RangeProps = Omit<BaseRangeProps, 'id'> &
  FormFieldProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, IgnoreAttributes>;

/** A controlled range input. */
export default function Range(props: RangeProps) {
  const { fieldProps, inputProps } = partitionFieldProps(props);
  const [id] = useState(() => uuid());

  return (
    <FormField {...fieldProps} id={id}>
      {/** inputProps.value is typed as a string, BaseRange takes a number. */}
      <BaseRange {...inputProps} value={props.value} id={id} />
    </FormField>
  );
}
