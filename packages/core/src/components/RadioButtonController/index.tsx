import React from 'react';
import uuid from 'uuid/v4';
import proxyComponent from '../../utils/proxyComponent';
import FormField, { Props as FormFieldProps, partitionFieldProps } from '../FormField';
import RadioButton, { Props as RadioButtonProps } from '../RadioButton';

export type PropsProvided = Partial<RadioButtonProps> & {
  label: NonNullable<React.ReactNode>;
  value: string;
};

export type Props = FormFieldProps & {
  /** Function children in which RadioButton components can be rendered. */
  children: (component: React.ComponentType<PropsProvided>, value: string, id: string) => void;
  /** Unique name of the field. */
  name: string;
  /** Callback that is triggered when a child RadioButton is clicked. */
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Default checked value. */
  value?: string;
};

export type State = {
  id: string;
  value: string;
};

/** Manage multiple radio buttons with the same input `name`. */
export default class RadioButtonController extends React.Component<Props, State> {
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

  private handleChange = (
    checked: boolean,
    value: string,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (value !== this.state.value) {
      this.props.onChange(value, event);

      this.setState({
        value,
      });
    }
  };

  renderRadioButton = proxyComponent(RadioButton, ({ value, ...props }: PropsProvided) => {
    const { inputProps } = partitionFieldProps(this.props);
    const { id, value: currentValue } = this.state;

    return (
      <RadioButton
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
  });

  render() {
    const { children, fieldProps } = partitionFieldProps(this.props);
    const { id, value } = this.state;

    return (
      <FormField {...fieldProps} id={id}>
        {children(this.renderRadioButton, value, id)}
      </FormField>
    );
  }
}
