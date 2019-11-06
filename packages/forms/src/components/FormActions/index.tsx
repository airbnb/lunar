import React from 'react';
import BaseFormActions, { Props as BaseProps } from '@airbnb/lunar/lib/components/FormActions';
import useForm from '../../hooks/useForm';

export type Props = Omit<BaseProps, 'disabled' | 'processing'>;

/** `FormActions` automatically connected to the parent `Form`. */
export default function FormActions(props: Props) {
  const form = useForm();
  const { submitting, valid } = form.getState();

  return <BaseFormActions {...props} disabled={!valid} processing={submitting} />;
}
