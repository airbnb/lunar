import React from 'react';
import uuid from 'uuid/v4';
import BaseInput, { BaseInputProps } from '../private/BaseInput';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';

export type InputProps = Omit<BaseInputProps, 'id'> & FormFieldProps;

export type InputState = {
  id: string;
};

/** A controlled input field. */
export default class Input extends React.Component<InputProps, InputState> {
  static defaultProps = {
    type: 'text',
  };

  state = {
    id: uuid(),
  };

  render() {
    const { fieldProps, inputProps } = partitionFieldProps(this.props);
    const { id } = this.state;

    if (inputProps.type === 'hidden') {
      return <BaseInput {...inputProps} hidden optional id={id} />;
    }

    return (
      <FormField {...fieldProps} id={id}>
        <BaseInput {...inputProps} id={id} />
      </FormField>
    );
  }
}
