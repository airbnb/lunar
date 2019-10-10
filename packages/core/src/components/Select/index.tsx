import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import uuid from 'uuid/v4';
import BaseSelect, { Props as BaseSelectProps } from '../private/BaseSelect';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';

export type Props = Omit<BaseSelectProps, 'id'> &
  FormFieldProps & {
    /** Dropdown options. Supports `option` and `optgroup`. */
    children: NonNullable<React.ReactNode>;
    /** Empty and disabled option to display the top of the list. */
    placeholder?: string;
  };

export type State = {
  id: string;
};

/** A controlled select field. */
export default class Select extends React.Component<Props, State> {
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
