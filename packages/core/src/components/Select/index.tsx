import React, { useState } from 'react';
import { childrenOfType } from 'airbnb-prop-types';
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
function Select<T extends string = string>(props: SelectProps<T>) {
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

Select.propTypes = {
  children: childrenOfType('option', 'optgroup').isRequired,
};

export default Select;
