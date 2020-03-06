import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import BaseRadioButton, { BaseRadioButtonProps } from '../private/BaseRadioButton';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import Text from '../Text';

const stateProp = mutuallyExclusiveTrueProps('checked', 'indeterminate');

export type RadioButtonProps<T extends string = string> = Omit<BaseRadioButtonProps<T>, 'value'> &
  FormFieldProps & {
    /** Middle align content. */
    middleAlign?: boolean;
    /** Unique value for this radio. */
    value: string;
  };

/** A controlled radio button field. */
function RadioButton<T extends string = string>(props: RadioButtonProps<T>) {
  const { children, fieldProps, inputProps } = partitionFieldProps<T, RadioButtonProps<T>>(props);
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
      <BaseRadioButton {...restProps} id={props.id || id} hideLabel={fieldProps.hideLabel}>
        {children || (
          <>
            <Text bold>{fieldProps.label}</Text>
            {fieldProps.labelDescription && <Text>{fieldProps.labelDescription}</Text>}
          </>
        )}
      </BaseRadioButton>
    </FormField>
  );
}

RadioButton.propTypes = {
  checked: stateProp,
  indeterminate: stateProp,
};

export default RadioButton;
