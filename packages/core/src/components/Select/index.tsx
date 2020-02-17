import React, { useState } from 'react';
import uuid from 'uuid/v4';
import BaseSelect, { BaseSelectProps } from '../private/BaseSelect';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';

export type SelectProps<T extends string> = Omit<BaseSelectProps<T>, 'id'> &
  FormFieldProps & {
    /** Dropdown options. Supports `option` and `optgroup`. */
    children: NonNullable<React.ReactNode>;
    /** Empty and disabled option to display the top of the list. */
    placeholder?: string;
  };

/** A controlled select field. */
export default function Select<T extends string = string>(props: SelectProps<T>) {
  const { children, fieldProps, inputProps } = partitionFieldProps<T, SelectProps<T>>(props);
  const [id] = useState(() => uuid());

  return (
    <FormField {...fieldProps} id={id}>
      <BaseSelect<T> {...inputProps} id={id}>
        {children}
      </BaseSelect>
    </FormField>
  );
}
