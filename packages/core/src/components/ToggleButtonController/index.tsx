import React from 'react';
import { v4 as uuid } from 'uuid';
import proxyComponent from '../../utils/proxyComponent';
import FormField, { partitionFieldProps, FormFieldProps } from '../FormField';
import BaseButton, { ButtonProps } from '../Button';
import FormInputButton from '../private/FormInputButton';
import ButtonGroup from '../ButtonGroup';
import { ButtonOrLinkTypes } from '../private/ButtonOrLink';

export { ButtonGroup };

export type ToggleButtonControlledProps<T extends string = string> = Partial<ButtonProps> & {
  children: NonNullable<React.ReactNode>;
  value: T;
};

export type ToggleButtonControllerProps<T extends string = string> = FormFieldProps & {
  /** Function children in which Button components can be rendered. */
  children: (
    component: React.ComponentType<ToggleButtonControlledProps<T>>,
    value: T,
    id: string,
  ) => void;
  /** Unique name of the field. */
  name: string;
  /** Callback that is triggered when a child Button is clicked. */
  onChange: (value: T, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Default value. */
  value?: T;
};

export type ToggleButtonControllerState<T extends string = string> = {
  id: string;
  value: T;
};

/** Manage a group of buttons with the same input `name`. */
export default class ToggleButtonController<T extends string = string> extends React.Component<
  ToggleButtonControllerProps<T>,
  ToggleButtonControllerState<T>
> {
  static defaultProps = {
    value: '',
  };

  state = {
    id: uuid(),
    value: this.props.value || ('' as T),
  };

  componentDidUpdate(prevProps: ToggleButtonControllerProps<T>) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value || ('' as T),
      });
    }
  }

  private handleClick = (event: React.MouseEvent<ButtonOrLinkTypes>) => {
    const newValue = event.currentTarget.dataset.value! as T;
    const { value } = this.state;

    if (newValue === value) {
      return;
    }

    this.props.onChange(newValue, event as React.MouseEvent<HTMLButtonElement>);

    this.setState({
      value: newValue,
    });
  };

  renderButton = proxyComponent<ToggleButtonControlledProps<T>>(
    BaseButton,
    ({ children, value, ...props }) => {
      const { small, disabled, invalid, large } = this.props;
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
          small={small}
          large={large}
          onClick={this.handleClick}
        >
          {children}
        </FormInputButton>
      );
    },
  );

  render() {
    const { children, fieldProps } = partitionFieldProps<T, ToggleButtonControllerProps<T>>(
      this.props,
    );
    const { id, value } = this.state;

    return (
      <FormField {...fieldProps} id={id}>
        {children(this.renderButton, value)}
      </FormField>
    );
  }
}
