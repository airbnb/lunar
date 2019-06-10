import React from 'react';
import omit from 'lodash/omit';
import { Omit } from 'utility-types';
import { fieldSubscriptionItems, FieldState, Unsubscribe } from 'final-form';
import finishHOC from '@airbnb/lunar/lib/utils/finishHOC';
import FormContext from '../components/FormContext';
import { toString } from '../helpers';
import { Context, Parse, Field } from '../types';

// Keep in sync with props!
export const PROP_NAMES = [
  'defaultValue',
  'form',
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

export type Options = {
  ignoreValue?: boolean;
  initialValue?: any;
  multiple?: boolean;
  parse?: Parse;
  valueProp?: 'value' | 'checked';
};

export interface ConnectToFormProps {
  name: string;
  invalid?: boolean;
  errorMessage?: string;
  field?: Partial<FieldState>;
  onBlur?: (event: React.FocusEvent) => void;
  onChange?: (...args: any[]) => void;
  onFocus?: (event: React.FocusEvent) => void;
  value?: any;
  checked?: boolean;
}

export interface ConnectToFormWrapperProps extends Field {
  onBatchChange?: (value: string | boolean) => object | undefined;
  onBlur?: (event: React.FocusEvent) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onStateUpdate?: (state: FieldState) => void;
  unregisterOnUnmount?: boolean;
}

export interface ConnectToFormState extends Partial<FieldState> {
  name: string;
}

export default function connectToForm(options: Options = {}) /* infer */ {
  const {
    ignoreValue = false,
    initialValue = '',
    multiple = false,
    parse = toString,
    valueProp = 'value',
  } = options;

  return function connectToFormFactory<Props extends object = {}>(
    WrappedComponent: React.ComponentType<Props & ConnectToFormProps>,
  ): React.ComponentType<OptionalOnChange<Props> & ConnectToFormWrapperProps> {
    type OwnProps = OptionalOnChange<Props> & ConnectToFormWrapperProps;

    class ConnectToForm extends React.Component<OwnProps & { form: Context }, ConnectToFormState> {
      static defaultProps = {
        defaultValue: parse(initialValue),
        isEqual: null,
        parse,
        subscriptions: fieldSubscriptionItems,
        unregisterOnUnmount: false,
        validateDefaultValue: false,
        validateFields: [],
      };

      // https://github.com/final-form/final-form#fieldstate
      state = {
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
        this.unregister = this.props.form!.register(this.props, this.handleUpdate);
      }

      componentDidUpdate(prevProps: OwnProps & { form: Context }) {
        // A name change is quite disruptive, so let's unregister and register again to be safe.
        // If this is causing issues in userland, add a unique key prop to each field.
        if (this.props.name !== prevProps.name && this.unregister) {
          this.unregister();
          this.unregister = this.props.form!.register(this.props, this.handleUpdate);

          return;
        }

        if (this.props.defaultValue !== prevProps.defaultValue) {
          this.setState(
            {
              value: this.props.defaultValue,
            },
            () => {
              if (typeof this.props.defaultValue === 'string') {
                this.props.form!.change(this.props.name, this.props.defaultValue, {});
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

      formatValue(defaultValue: any): any {
        const cast = this.props.parse as Parse;
        let value = defaultValue;

        if (multiple && !Array.isArray(value)) {
          value = value ? [value] : [];
        }

        return Array.isArray(value) ? value.map(v => cast(v)) : cast(value);
      }

      omitFormProps(props: Partial<OwnProps>): Props {
        return omit(props, PROP_NAMES) as Props;
      }

      private handleBlur = (event: React.FocusEvent) => {
        this.state.blur();

        if (this.props.onBlur) {
          this.props.onBlur(event);
        }
      };

      private handleChange = (
        checkedOrValue: any,
        valueOrEvent: any,
        event?: React.ChangeEvent,
      ) => {
        this.props.form!.change(
          this.props.name,
          checkedOrValue,
          this.props.onBatchChange ? this.props.onBatchChange(checkedOrValue) : {},
        );

        if (this.props.onChange) {
          this.props.onChange(checkedOrValue, valueOrEvent, event);
        }
      };

      private handleFocus = (event: React.FocusEvent) => {
        this.state.focus();

        if (this.props.onFocus) {
          this.props.onFocus(event);
        }
      };

      private handleUpdate = (state: FieldState) => {
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

    function ConnectToFormWrapper(props: OwnProps) {
      return (
        <FormContext.Consumer>
          {form => form && <ConnectToForm {...(props as any)} form={form} />}
        </FormContext.Consumer>
      );
    }

    return finishHOC('connectToForm', ConnectToFormWrapper, WrappedComponent);
  };
}
