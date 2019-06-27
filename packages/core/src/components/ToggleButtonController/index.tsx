import React from 'react';
import uuid from 'uuid/v4';
import proxyComponent from '../../utils/proxyComponent';
import FormField, { partitionFieldProps, Props as FormFieldProps } from '../FormField';
import BaseButton, { Props as ButtonProps } from '../Button';
import FormInputButton from '../private/FormInputButton';
import ButtonGroup from '../ButtonGroup';

export { ButtonGroup };

export type PropsProvided = Partial<ButtonProps> & {
  children: NonNullable<React.ReactNode>;
  value: string;
};

export type Props = FormFieldProps & {
  /** Function children in which Button components can be rendered. */
  children: (component: React.ComponentType<PropsProvided>, value: string, id: string) => void;
  /** Unique name of the field. */
  name: string;
  /** Callback that is triggered when a child Button is clicked. */
  onChange: (value: string, event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Default value. */
  value?: string;
};

export type State = {
  id: string;
  value: string;
};

/** Manage a group of buttons with the same input `name`. */
export default class ToggleButtonController extends React.Component<Props, State> {
  static defaultProps = {
    value: '',
  };

  state = {
    id: uuid(),
    value: this.props.value || '',
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value || '',
      });
    }
  }

  private handleClick = (event: React.MouseEvent<any>) => {
    const { value: newValue } = event.currentTarget;
    const { value } = this.state;

    if (newValue === value) {
      return;
    }

    this.props.onChange(newValue, event);

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
        id={`${id}-${value}`}
        name={name}
        value={value}
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
