import React from 'react';
import uuid from 'uuid/v4';
import { Omit } from 'utility-types';
import BaseInput, { Props as BaseInputProps } from '../private/BaseInput';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';

export type Props = Omit<BaseInputProps, 'id'> & FormFieldProps;

export type State = {
  id: string;
};

/** A controlled input field. */
export default class Input extends React.Component<Props, State> {
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
