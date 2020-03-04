import React from 'react';
import FormInput, { InputProps } from './FormInput';

export type BaseInputProps = InputProps & {
  /** Callback fired when the value changes. */
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default class BaseInput extends React.Component<BaseInputProps> {
  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onChange(event.currentTarget.value, event);
  };

  render() {
    const { ...restProps } = this.props;

    return <FormInput {...restProps} tagName="input" onChange={this.handleChange} />;
  }
}
