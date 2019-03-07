import React from 'react';
import BaseAutocomplete, { Props, Item } from '@airbnb/lunar/lib/components/Autocomplete';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `Autocomplete` automatically connected to the parent `Form`. */
export function FormAutocomplete<T extends Item>(props: Props<T> & ConnectToFormProps) {
  return <BaseAutocomplete<T> {...props} />;
}

export default connectToForm()(FormAutocomplete);
