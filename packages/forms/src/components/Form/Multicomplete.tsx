import React from 'react';
import BaseMulticomplete, { Props, Item } from '@airbnb/lunar/lib/components/Multicomplete';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `Multicomplete` automatically connected to the parent `Form`.  */
export function FormMulticomplete<T extends Item>(props: Props<T> & ConnectToFormProps) {
  return <BaseMulticomplete<T> {...props} />;
}

export default connectToForm({
  multiple: true,
})(FormMulticomplete);
