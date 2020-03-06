import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import BaseCheckBox, { BaseCheckBoxProps } from '../private/BaseCheckBox';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import Text from '../Text';

export type CheckBoxProps<T extends string = string> = BaseCheckBoxProps<T> &
  FormFieldProps & {
    /** Middle align content. */
    middleAlign?: boolean;
  };

/** A controlled checkbox field. */
export default function CheckBox<T extends string = string>(props: CheckBoxProps<T>) {
  const { children, fieldProps, inputProps } = partitionFieldProps<T, CheckBoxProps<T>>(props);
  const { middleAlign, ...restProps } = inputProps;
  const [id] = useState(() => uuid());

  return (
    <FormField
      {...fieldProps}
      inline
      renderBeforeLabel
      renderLargeLabel
      stretchLabel
      id={props.id || id}
      hideLabel={fieldProps.hideLabel || inputProps.button}
      renderFullWidth={inputProps.button}
      topAlign={!middleAlign}
    >
      <BaseCheckBox<T>
        value="1"
        {...restProps}
        id={props.id || id}
        hideLabel={fieldProps.hideLabel}
      >
        {children || (
          <>
            <Text bold>{fieldProps.label}</Text>
            {fieldProps.labelDescription && <Text>{fieldProps.labelDescription}</Text>}
          </>
        )}
      </BaseCheckBox>
    </FormField>
  );
}
