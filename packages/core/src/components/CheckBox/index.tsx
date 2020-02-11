import React from 'react';
import uuid from 'uuid/v4';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import BaseCheckBox, { BaseCheckBoxProps } from '../private/BaseCheckBox';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import Text from '../Text';

const stateProp = mutuallyExclusiveTrueProps('checked', 'indeterminate');

export type CheckBoxProps = BaseCheckBoxProps &
  FormFieldProps & {
    /** Top align content. */
    topAlign?: boolean;
  };

export type CheckBoxState = {
  id: string;
};

/** A controlled checkbox field. */
export default class CheckBox extends React.Component<CheckBoxProps, CheckBoxState> {
  static defaultProps = {
    button: false,
    checked: false,
    children: null,
    indeterminate: false,
    topAlign: false,
    value: '1',
  };

  static propTypes = {
    checked: stateProp,
    indeterminate: stateProp,
  };

  state = {
    // Support for CheckBoxController
    id: this.props.id || uuid(),
  };

  render() {
    const { children, fieldProps, inputProps } = partitionFieldProps(this.props);
    const { topAlign, ...restProps } = inputProps;
    const { id } = this.state;
    const { hideLabel } = fieldProps;

    return (
      <FormField
        {...fieldProps}
        inline
        renderBeforeLabel
        renderLargeLabel
        stretchLabel
        id={id}
        hideLabel={fieldProps.hideLabel || inputProps.button}
        renderFullWidth={inputProps.button}
        topAlign={topAlign}
      >
        <BaseCheckBox {...restProps} id={id} hideLabel={hideLabel}>
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
}
