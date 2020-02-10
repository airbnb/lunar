import React from 'react';
import uuid from 'uuid/v4';
import proxyComponent from '../../utils/proxyComponent';
import FormField, { partitionFieldProps, FormFieldProps } from '../FormField';
import BaseButton, { ButtonProps } from '../Button';
import FormInputButton from '../private/FormInputButton';
import ButtonGroup from '../ButtonGroup';
import { ButtonOrLinkTypes } from '../private/ButtonOrLink';

export { ButtonGroup };

export type PropsProvided = Partial<ButtonProps> & {
  children: NonNullable<React.ReactNode>;
  value: string;
};

export type ToggleButtonControllerProps = FormFieldProps & {
  /** Function children in which Button components can be rendered. */
  children: (component: React.ComponentType<PropsProvided>, value: string, id: string) => void;
  /** Unique name of the field. */
  name: string;
  /** Callback that is triggered when a child Button is clicked. */
  onChange: (value: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Default value. */
  value?: string;
};

export type ToggleButtonControllerState = {
  id: string;
  value: string;
};

/** Manage a group of buttons with the same input `name`. */
export default class ToggleButtonController extends React.Component<
  ToggleButtonControllerProps,
  ToggleButtonControllerState
> {
  static defaultProps = {
    value: '',
  };

  state = {
    id: uuid(),
    value: this.props.value || '',
  };

  componentDidUpdate(prevProps: ToggleButtonControllerProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value || '',
      });
    }
  }

  private handleClick = (event: React.MouseEvent<ButtonOrLinkTypes>) => {
    const newValue = event.currentTarget.dataset.value!;
    const { value } = this.state;

    if (newValue === value) {
      return;
    }

    this.props.onChange(newValue, event as React.MouseEvent<HTMLButtonElement>);

    this.setState({
      value: newValue,
    });
  };

  renderButton = proxyComponent(BaseButton, ({ children, value, ...props }: PropsProvided) => {
    const { compact, disabled, invalid } = this.props;
    const { id, value: selectedValue } = this.state;
    const selected = value === selectedValue;

    return (
      <FormInputButton
        {...props}
        data-value={value}
        id={`${id}-${value}`}
        name={name}
        disabled={disabled}
        inverted={!selected}
        invalid={invalid}
        small={compact}
        onClick={this.handleClick}
      >
        {children}
      </FormInputButton>
    );
  });

  render() {
    const { children, fieldProps } = partitionFieldProps(this.props);
    const { id, value } = this.state;

    return (
      <FormField {...fieldProps} id={id}>
        {children(this.renderButton, value)}
      </FormField>
    );
  }
}
