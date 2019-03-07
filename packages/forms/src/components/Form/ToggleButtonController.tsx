import React from 'react';
import BaseToggleButtonController, {
  Props,
} from '@airbnb/lunar/lib/components/ToggleButtonController';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `ToggleButtonController` automatically connected to the parent `Form`.  */
export function FormToggleButtonController(props: Props & ConnectToFormProps) {
  return <BaseToggleButtonController {...props} />;
}

export default connectToForm()(FormToggleButtonController);
