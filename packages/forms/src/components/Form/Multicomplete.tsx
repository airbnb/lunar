import React from 'react';
import BaseMulticomplete, { Props } from '@airbnb/lunar/lib/components/Multicomplete';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `Multicomplete` automatically connected to the parent `Form`.  */
export function FormMulticomplete(props: Props<any> & ConnectToFormProps<string[]>) {
  return <BaseMulticomplete {...props} />;
}

export default connectToForm<string[]>({
  initialValue: [],
  multiple: true,
  parse: toString,
})(FormMulticomplete);
