import React from 'react';
import uuid from 'uuid/v4';
import BaseSwitch, { Props as BaseSwitchProps } from '../private/BaseSwitch';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';

export type Props = Omit<BaseSwitchProps, 'id'> & FormFieldProps;

export type State = {
  id: string;
};

/** A controlled switch (fancy checkbox) field. */
export default class Switch extends React.Component<Props, State> {
  static defaultProps = {
    checked: false,
  };

  state = {
    id: uuid(),
  };

  render() {
    const { fieldProps, inputProps } = partitionFieldProps(this.props);
    const { id } = this.state;

    return (
      <FormField {...fieldProps} inline stretchLabel id={id}>
        <BaseSwitch value="1" {...inputProps} id={id} />
      </FormField>
    );
  }
}
