import React, { useEffect, useState, useRef } from 'react';
import { FieldState, fieldSubscriptionItems, Unsubscribe } from 'final-form';
import shallowEqual from 'shallowequal';
import { Parse, Field, DefaultValue } from '../types';
import useForm from './useForm';

export type Options<T> = {
  ignoreValue?: boolean;
  initialValue: T;
  multiple?: boolean;
  parse?: Parse<T>;
  valueProp?: 'value' | 'checked';
};

export type FieldProps<T, P> = Omit<P, 'defaultValue' | 'onChange'> & FieldInternalProps<T>;

export type FieldReturnProps<T, P> = Omit<P, keyof FieldInternalProps<T>> & FieldProvidedProps<T>;

export interface FieldInternalProps<T> extends Field<T> {
  onBatchChange?: (value: T) => object | undefined;
  onBlur?: (event: React.FocusEvent) => void;
  onChange?: (value: T, ...args: any[]) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onStateUpdate?: (state: FieldState<T>) => void;
  unregisterOnUnmount?: boolean;
}

export interface FieldProvidedProps<T> {
  name: string;
  invalid: boolean;
  errorMessage: string;
  field: FieldState<T>;
  onBlur: (event: React.FocusEvent) => void;
  onChange: (value: T, ...args: any[]) => void;
  onFocus: (event: React.FocusEvent) => void;
  value?: T;
  checked?: boolean;
}

function formatError(error: string | Error): string {
  if (!error) {
    return '';
  }

  return error instanceof Error ? error.message : String(error);
}

function formatValue<T>(defaultValue: DefaultValue<T>, multiple: boolean, cast?: Parse<T>) {
  let value = defaultValue;

  // Some fields dont use the value, so wont have a parser
  if (!cast) {
    return value;
  }

  if (multiple && !Array.isArray(value)) {
    // @ts-ignore Some consumers use arrays, so handle it custom here
    value = [value] as string[];
  }

  if (Array.isArray(value)) {
    return value.map(cast);
  }

  // @ts-ignore Typing this is very difficult
  return cast(value);
}

export default function useFormField<T, P>(
  props: FieldProps<T, P>,
  {
    ignoreValue = false,
    initialValue,
    multiple = false,
    parse: defaultParse,
    valueProp = 'value',
  }: Options<T>,
): FieldReturnProps<T, P> {
  const {
    defaultValue = initialValue,
    isEqual,
    name,
    onBatchChange,
    onBlur,
    onChange,
    onFocus,
    onStateUpdate,
    parse = defaultParse,
    subscriptions = fieldSubscriptionItems,
    unregisterOnUnmount,
    validateDefaultValue = false,
    validateFields = [],
    validator,
    ...restProps
  } = props;
  const form = useForm();
  const [field, setField] = useState<FieldState<T>>({
    change() {},
    blur() {},
    error: '',
    focus() {},
    invalid: false,
    touched: false,
    name,
    value: defaultValue!,
  });
  const fieldName = useRef(name);
  const fieldDefaultValue = useRef(defaultValue);
  const unregister = useRef<Unsubscribe>();

  // Register field in parent form
  useEffect(() => {
    let mounted = true;

    // If name changes, unregister old and register new
    if (name !== fieldName.current && unregister.current) {
      unregister.current();
    }

    unregister.current = form.register(
      {
        defaultValue,
        isEqual,
        name,
        parse,
        subscriptions: subscriptions as Field<T>['subscriptions'],
        validateDefaultValue,
        validateFields,
        validator,
      },
      state => {
        if (mounted) {
          setField(prevField => ({
            ...prevField,
            ...state,
          }));
        }

        if (onStateUpdate) {
          onStateUpdate(state);
        }
      },
    );

    return () => {
      mounted = false;

      if (unregisterOnUnmount && unregister.current) {
        unregister.current();
      }
    };
    // We only want to register/unregister fields when the name changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  // Change value in form if default value changes
  useEffect(
    () => {
      if (defaultValue && !shallowEqual(defaultValue, fieldDefaultValue.current)) {
        form.change(name, defaultValue);
        fieldDefaultValue.current = defaultValue;
      }
    },
    // We only want to update the value when the default value changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Array.isArray(defaultValue) ? [...defaultValue] : [defaultValue],
  );

  return {
    ...((restProps as unknown) as P),
    errorMessage: field.touched ? formatError(field.error) : '',
    field,
    invalid: field.touched ? field.invalid! : false,
    name,
    onBlur(event: React.FocusEvent) {
      field.blur();

      if (onBlur) {
        onBlur(event);
      }
    },
    onChange(
      checkedOrValue: T,
      valueOrEvent: T | React.ChangeEvent<unknown>,
      event?: React.ChangeEvent,
    ) {
      form.change(name, checkedOrValue, onBatchChange ? onBatchChange(checkedOrValue) : {});

      if (onChange) {
        onChange(checkedOrValue, valueOrEvent, event);
      }
    },
    onFocus(event: React.FocusEvent) {
      field.focus();

      if (onFocus) {
        onFocus(event);
      }
    },
    [valueProp as 'value']: ignoreValue ? undefined : formatValue(field.value, multiple, parse),
  };
}
