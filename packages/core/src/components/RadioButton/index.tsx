import React from 'react';
import uuid from 'uuid/v4';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import { Omit } from 'utility-types';
import BaseRadioButton, { Props as BaseRadioButtonProps } from '../private/BaseRadioButton';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';
import Text from '../Text';

const stateProp = mutuallyExclusiveTrueProps('checked', 'indeterminate');

export type Props = Omit<BaseRadioButtonProps, 'value'> &
  FormFieldProps & {
    /** Top align content. */
    topAlign?: boolean;
    /** Unique value for this radio. */
    value: string;
  };

export type State = {
  id: string;
};

/** A controlled radio button field. */
export default class RadioButton extends React.Component<Props, State> {
  static defaultProps = {
    button: false,
    checked: false,
    children: null,
    indeterminate: false,
    topAlign: false,
  };

  static propTypes = {
    checked: stateProp,
    indeterminate: stateProp,
  };

  state = {
    // Support for RadioButtonController
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
        id={id}
        hideLabel={fieldProps.hideLabel || inputProps.button}
        renderFullWidth={inputProps.button}
        topAlign={topAlign}
        inline
        renderBeforeLabel
        renderLargeLabel
        stretchLabel
      >
        <BaseRadioButton {...restProps} id={id} hideLabel={hideLabel}>
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
}
