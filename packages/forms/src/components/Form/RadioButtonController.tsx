import React from 'react';
import BaseRadioButtonController, {
  Props,
} from '@airbnb/lunar/lib/components/RadioButtonController';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';

/** `RadioButtonController` automatically connected to the parent `Form`.  */
export function FormRadioButtonController(props: Props & ConnectToFormProps) {
  return <BaseRadioButtonController {...props} />;
}

export default connectToForm()(FormRadioButtonController);
