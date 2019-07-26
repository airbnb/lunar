import React from 'react';
import BaseToggleButtonController, {
  Props,
} from '@airbnb/lunar/lib/components/ToggleButtonController';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `ToggleButtonController` automatically connected to the parent `Form`.  */
export function FormToggleButtonController(props: Props & ConnectToFormProps<string>) {
  return <BaseToggleButtonController {...props} />;
}

export default connectToForm<string>({
  initialValue: '',
  parse: toString,
})(FormToggleButtonController);
