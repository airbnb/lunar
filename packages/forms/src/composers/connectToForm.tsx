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

export default function connectToForm<T>(options: Options<T>) /* infer */ {
  return function connectToFormFactory<P>(
    WrappedComponent: React.ComponentType<FieldReturnProps<T, P>>,
  ): React.ComponentType<FieldProps<T, P>> {
    function ConnectToForm(props: FieldProps<T, P>) {
      const fieldProps = useFormField<T, P>(props, options);

      return <WrappedComponent {...fieldProps} />;
    }

    return finishHOC('connectToForm', ConnectToForm, WrappedComponent);
  };
}
