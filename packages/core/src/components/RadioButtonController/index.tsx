import React from 'react';
import { v4 as uuid } from 'uuid';
import proxyComponent from '../../utils/proxyComponent';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import RadioButton, { RadioButtonProps } from '../RadioButton';

type Renderer<T extends string> = (
  component: React.ComponentType<RadioButtonControlledProps<T>>,
  value: T,
  id: string,
) => React.ReactElement;

export type RadioButtonControlledProps<T extends string = string> = Partial<
  Omit<RadioButtonProps<T>, 'label' | 'value'>
> & {
  label: NonNullable<React.ReactNode>;
  value: T;
};

export type RadioButtonControllerProps<T extends string = string> = FormFieldProps & {
  /** Function children in which RadioButton components can be rendered. */
  children: Renderer<T>;
  /** Unique name of the field. */
  name: string;
  /** Callback that is triggered when a child RadioButton is clicked. */
  onChange: (value: T, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Default checked value. */
  value?: T;
};

export type RadioButtonControllerState<T extends string = string> = {
  id: string;
  value: T;
};

/** Manage multiple radio buttons with the same input `name`. */
export default class RadioButtonController<T extends string = string> extends React.Component<
  RadioButtonControllerProps<T>,
  RadioButtonControllerState<T>
> {
  static defaultProps = {
    value: '',
  };

  state = {
    id: uuid(),
    value: this.props.value || ('' as T),
  };

  componentDidUpdate(prevProps: RadioButtonControllerProps<T>) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value || ('' as T),
      });
    }
  }

  private handleChange = (
    checked: boolean,
    value: T,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (value !== this.state.value) {
      this.props.onChange(value, event);

      this.setState({
        value,
      });
    }
  };

  renderRadioButton = proxyComponent<RadioButtonControlledProps<T>>(
    RadioButton,
    ({ value, ...props }) => {
      const { inputProps } = partitionFieldProps<T, RadioButtonControllerProps<T>>(this.props);
      const { id, value: currentValue } = this.state;

      return (
        <RadioButton<T>
          compactSpacing
          {...props}
          {...inputProps}
          hideOptionalLabel
          id={`${id}-${value}`}
          value={value}
          checked={value === currentValue}
          onChange={this.handleChange}
        />
      );
    },
  );

  render() {
    const { children, fieldProps } = partitionFieldProps<T, RadioButtonControllerProps<T>>(
      this.props,
    );
    const { id, value } = this.state;

    return (
      <FormField {...fieldProps} id={id}>
        {(children as Renderer<T>)(this.renderRadioButton, value, id)}
      </FormField>
    );
  }
}
