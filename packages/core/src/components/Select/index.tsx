import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import uuid from 'uuid/v4';
import BaseSelect, { BaseSelectProps } from '../private/BaseSelect';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';

export type SelectProps = Omit<BaseSelectProps, 'id'> &
  FormFieldProps & {
    /** Dropdown options. Supports `option` and `optgroup`. */
    children: NonNullable<React.ReactNode>;
    /** Empty and disabled option to display the top of the list. */
    placeholder?: string;
  };

export type SelectState = {
  id: string;
};

/** A controlled select field. */
export default class Select extends React.Component<SelectProps, SelectState> {
  static propTypes = {
    children: childrenOfType('option', 'optgroup').isRequired,
  };

  static defaultProps = {
    placeholder: '',
  };

  state = {
    id: uuid(),
  };

  render() {
    const { children, fieldProps, inputProps } = partitionFieldProps(this.props);
    const { id } = this.state;

    return (
      <FormField {...fieldProps} id={id}>
        <BaseSelect {...inputProps} id={id}>
          {children}
        </BaseSelect>
      </FormField>
    );
  }
}
