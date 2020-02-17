import React from 'react';
import uuid from 'uuid/v4';
import shallowEqual from 'shallowequal';
import proxyComponent from '../../utils/proxyComponent';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import CheckBox, { CheckBoxProps } from '../CheckBox';

export type CheckBoxControlledProps<T extends string> = Partial<
  Omit<CheckBoxProps<T>, 'label' | 'value'>
> & {
  label: NonNullable<React.ReactNode>;
  value: T;
};

export type CheckBoxControllerProps<T extends string> = FormFieldProps & {
  /** Function children in which CheckBox components can be rendered. */
  children: (
    component: React.ComponentType<CheckBoxControlledProps<T>>,
    values: T[],
    id: string,
  ) => void;
  /** Unique name of the field. */
  name: string;
  /** Callback that is triggered when a child CheckBox is clicked. */
  onChange: (values: T[], event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Default checked values. */
  value?: T[];
};

export type CheckBoxControllerState<T extends string> = {
  id: string;
  values: Set<T>;
};

/** Manage multiple checkboxes with the same input `name`. */
export default class CheckBoxController<T extends string = string> extends React.Component<
  CheckBoxControllerProps<T>,
  CheckBoxControllerState<T>
> {
  static defaultProps = {
    value: [],
  };

  state = {
    id: uuid(),
    values: new Set(this.props.value),
  };

  componentDidUpdate(prevProps: CheckBoxControllerProps<T>) {
    if (!shallowEqual(this.props.value, prevProps.value!)) {
      this.setState({
        values: new Set(this.props.value),
      });
    }
  }

  private handleChange = (
    checked: boolean,
    value: T,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    this.setState(
      prevState => {
        const values = new Set(prevState.values);

        if (checked) {
          values.add(value);
        } else {
          values.delete(value);
        }

        return {
          values,
        };
      },
      () => {
        this.props.onChange(Array.from(this.state.values), event);
      },
    );
  };

  renderCheckBox = proxyComponent<CheckBoxControlledProps<T>>(CheckBox, ({ value, ...props }) => {
    const { inputProps } = partitionFieldProps<T, CheckBoxControllerProps<T>>(this.props);
    const { id, values } = this.state;

    return (
      <CheckBox<T>
        compactSpacing
        {...props}
        {...inputProps}
        hideOptionalLabel
        id={`${id}-${value}`}
        value={value}
        checked={values.has(value)}
        onChange={this.handleChange}
      />
    );
  });

  render() {
    const { children, fieldProps } = partitionFieldProps<T, CheckBoxControllerProps<T>>(this.props);
    const { id, values } = this.state;

    return (
      <FormField {...fieldProps} id={id}>
        {children(this.renderCheckBox, Array.from(values), id)}
      </FormField>
    );
  }
}
