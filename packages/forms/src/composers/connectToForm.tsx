import React from 'react';
import omit from 'lodash/omit';
import { Omit } from 'utility-types';
import { fieldSubscriptionItems, FieldState, Unsubscribe } from 'final-form';
import finishHOC from '@airbnb/lunar/lib/utils/finishHOC';
import FormContext from '../components/FormContext';
import { Context, Parse, Field, DefaultValue } from '../types';

// Keep in sync with props!
export const PROP_NAMES = [
  'defaultValue',
  'isEqual',
  'name',
  'onBatchChange',
  'onBlur',
  'onChange',
  'onFocus',
  'onStateUpdate',
  'parse',
  'subscriptions',
  'unregisterOnUnmount',
  'validateDefaultValue',
  'validateFields',
  'validator',
];

// Our composer provides implementations for required props
// in the wrapped component, so we need to mark them as optional.
export type OnChangeHandler = (...args: any[]) => any;

export type OptionalOnChange<T> = T extends { onChange: OnChangeHandler }
  ? Omit<T, 'onChange'> & Partial<Pick<T, 'onChange'>>
  : T & { onChange?: OnChangeHandler };

export type Options<T> = {
  ignoreValue?: boolean;
  initialValue: T;
  multiple?: boolean;
  parse: Parse<T>;
  valueProp?: 'value' | 'checked';
};

export interface ConnectToFormProps<T> {
  name: string;
  invalid?: boolean;
  errorMessage?: string;
  field?: Partial<FieldState<T>>;
  onBlur?: (event: React.FocusEvent) => void;
  onChange?: (value: T, ...args: any[]) => void;
  onFocus?: (event: React.FocusEvent) => void;
  value?: T;
  checked?: boolean;
}

export interface ConnectToFormWrapperProps<T> extends Field<T> {
  onBatchChange?: (value: T) => object | undefined;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onStateUpdate?: (state: FieldState<T>) => void;
  unregisterOnUnmount?: boolean;
}

export interface ConnectToFormState extends Required<FieldState<any>> {
  name: string;
}

export default function connectToForm<T>(options: Options<T>) /* infer */ {
  const {
    ignoreValue = false,
    initialValue,
    multiple = false,
    parse,
    valueProp = 'value',
  } = options;

  return function connectToFormFactory<Props extends object = {}>(
    WrappedComponent: React.ComponentType<Props & ConnectToFormProps<T>>,
  ): React.ComponentType<OptionalOnChange<Props> & ConnectToFormWrapperProps<T>> {
    type OwnProps = OptionalOnChange<Props> & ConnectToFormWrapperProps<T>;

    class ConnectToForm extends React.Component<OwnProps, ConnectToFormState> {
      static contextType = FormContext;

      static defaultProps: any = {
        defaultValue: initialValue,
        parse,
        subscriptions: fieldSubscriptionItems,
        unregisterOnUnmount: false,
        validateDefaultValue: false,
        validateFields: [],
      };

      // @ts-ignore Only for typing the property
      context: Context;

      // https://github.com/final-form/final-form#fieldstate
      state: any = {
        blur() {},
        error: '',
        focus() {},
        invalid: false,
        touched: false,
        name: this.props.name,
        value: this.props.defaultValue,
      };

      private mounted: boolean = false;

      private unregister: Unsubscribe | null = null;

      componentDidMount() {
        this.mounted = true;

        // Register the form after the mounted boolean above is set.
        // Otherwise form data will be lost in `handleUpdate` when the
        // component is unmounted and mounted again.
        this.unregister = this.context.register(this.props, this.handleUpdate);
      }

      componentDidUpdate(prevProps: OwnProps & { form: Context }) {
        // A name change is quite disruptive, so let's unregister and register again to be safe.
        // If this is causing issues in userland, add a unique key prop to each field.
        if (this.props.name !== prevProps.name && this.unregister) {
          this.unregister();
          this.unregister = this.context.register(this.props, this.handleUpdate);

          return;
        }

        if (this.props.defaultValue !== prevProps.defaultValue) {
          this.setState(
            {
              value: this.props.defaultValue,
            },
            () => {
              if (typeof this.props.defaultValue === 'string') {
                this.context.change(this.props.name, this.props.defaultValue, {});
              }
            },
          );
        }
      }

      componentWillUnmount() {
        this.mounted = false;

        if (this.props.unregisterOnUnmount && this.unregister) {
          this.unregister();
        }
      }

      formatError(error: string | Error): string {
        if (!error) {
          return '';
        }

        return error instanceof Error ? error.message : String(error);
      }

      formatValue(defaultValue: DefaultValue): T {
        const cast = this.props.parse as Parse<T>;
        let value: any = defaultValue;

        if (multiple && !Array.isArray(value)) {
          value = [value];
        }

        if (Array.isArray(value)) {
          // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
          return (value as any).map(cast);
        }

        return cast(value) as any;
      }

      omitFormProps(props: Partial<OwnProps>): Props {
        return omit(props, PROP_NAMES) as Props;
      }

      private handleBlur = (event: React.FocusEvent) => {
        this.state.blur!();

        if (this.props.onBlur) {
          this.props.onBlur(event);
        }
      };

      private handleChange = (
        checkedOrValue: T,
        valueOrEvent: string | React.ChangeEvent<any>,
        event?: React.ChangeEvent,
      ) => {
        this.context.change(
          this.props.name,
          checkedOrValue,
          this.props.onBatchChange ? this.props.onBatchChange(checkedOrValue) : {},
        );

        if (this.props.onChange) {
          this.props.onChange(checkedOrValue, valueOrEvent, event);
        }
      };

      private handleFocus = (event: React.FocusEvent) => {
        this.state.focus!();

        if (this.props.onFocus) {
          this.props.onFocus(event);
        }
      };

      private handleUpdate = (state: FieldState<any>) => {
        if (!this.mounted) {
          return;
        }

        this.setState(
          prevState => ({
            ...prevState,
            ...state,
          }),
          () => {
            if (this.props.onStateUpdate) {
              this.props.onStateUpdate(state);
            }
          },
        );
      };

      render() {
        const { error, invalid, touched, name, value } = this.state;
        const props = {
          name,
          invalid: touched ? invalid : false,
          errorMessage: touched ? this.formatError(error) : '',
          onBlur: this.handleBlur,
          onChange: this.handleChange,
          onFocus: this.handleFocus,
        };

        if (!ignoreValue) {
          (props as any)[valueProp] = this.formatValue(value);
        }

        return (
          <WrappedComponent {...this.omitFormProps(this.props)} {...props} field={this.state} />
        );
      }
    }

    return finishHOC('connectToForm', ConnectToForm, WrappedComponent);
  };
}
