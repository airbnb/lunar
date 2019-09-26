import React from 'react';
import BaseAutocomplete, { Props } from '@airbnb/lunar/lib/components/Autocomplete';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `Autocomplete` automatically connected to the parent `Form`. */
export function FormAutocomplete(props: Props & ConnectToFormProps<string>) {
  return <BaseAutocomplete {...props} />;
}

export default connectToForm<string>({
  initialValue: '',
  parse: toString,
})(FormAutocomplete);
