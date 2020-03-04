import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import BaseSwitch, { BaseSwitchProps } from '../private/BaseSwitch';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';

export type SwitchProps<T extends string> = Omit<BaseSwitchProps<T>, 'id'> & FormFieldProps;

/** A controlled switch (fancy checkbox) field. */
export default function Switch<T extends string = string>(props: SwitchProps<T>) {
  const { fieldProps, inputProps } = partitionFieldProps<T, SwitchProps<T>>(props);
  const [id] = useState(() => uuid());

  return (
    <FormField {...fieldProps} inline stretchLabel id={id}>
      <BaseSwitch<T> value="1" {...inputProps} id={id} />
    </FormField>
  );
}
