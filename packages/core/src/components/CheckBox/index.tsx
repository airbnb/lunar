import React, { useState } from 'react';
import uuid from 'uuid/v4';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import BaseCheckBox, { BaseCheckBoxProps } from '../private/BaseCheckBox';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import Text from '../Text';

const stateProp = mutuallyExclusiveTrueProps('checked', 'indeterminate');

export type CheckBoxProps<T extends string> = BaseCheckBoxProps<T> &
  FormFieldProps & {
    /** Top align content. */
    topAlign?: boolean;
  };

/** A controlled checkbox field. */
function CheckBox<T extends string = string>(props: CheckBoxProps<T>) {
  const { children, fieldProps, inputProps } = partitionFieldProps<T, CheckBoxProps<T>>(props);
  const { topAlign, ...restProps } = inputProps;
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
      topAlign={topAlign}
    >
      <BaseCheckBox<T> {...restProps} id={props.id || id} hideLabel={fieldProps.hideLabel}>
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

CheckBox.propTypes = {
  checked: stateProp,
  indeterminate: stateProp,
};

export default CheckBox;
