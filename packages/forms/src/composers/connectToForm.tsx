import React from 'react';
import finishHOC from '@airbnb/lunar/lib/utils/finishHOC';
import useFormField, {
  Options as BaseOptions,
  FieldProps,
  FieldReturnProps,
  FieldInternalProps,
  FieldProvidedProps,
} from '../hooks/useFormField';

export type Options<T> = BaseOptions<T>;
export type ConnectToFormProps<T> = FieldProvidedProps<T>;
export type ConnectToFormWrapperProps<T> = FieldInternalProps<T>;

if (__DEV__) {
  console.warn(
    '`connectToForm` composer is deprecated. Please migrate to the `useFormField` hook.',
  );
}

export default function connectToForm<T>(options: Options<T>) /* infer */ {
  return function connectToFormFactory<P>(
    WrappedComponent: React.ComponentType<FieldProps<T, P>>,
  ): React.ComponentType<FieldReturnProps<T, P>> {
    function ConnectToForm(props: FieldProps<T, P>) {
      const fieldProps = useFormField<T, P>(props, options);

      // @ts-ignore
      return <WrappedComponent {...fieldProps} />;
    }

    // @ts-ignore
    return finishHOC('connectToForm', ConnectToForm, WrappedComponent);
  };
}
