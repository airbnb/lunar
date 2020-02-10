import React from 'react';
import BaseFormActions, {
  FormActionsProps as BaseProps,
} from '@airbnb/lunar/lib/components/FormActions';
import useForm from '../../hooks/useForm';

export type FormActionsProps = Omit<BaseProps, 'disabled' | 'processing'>;

/** `FormActions` automatically connected to the parent `Form`. */
export default function FormActions(props: FormActionsProps) {
  const form = useForm();
  const { submitting, valid } = form.getState();

  return <BaseFormActions {...props} disabled={!valid} processing={submitting} />;
}
