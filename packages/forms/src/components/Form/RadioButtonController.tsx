import React from 'react';
import BaseRadioButtonController, {
  Props,
} from '@airbnb/lunar/lib/components/RadioButtonController';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toString } from '../../helpers';

/** `RadioButtonController` automatically connected to the parent `Form`.  */
export function FormRadioButtonController(props: Props & ConnectToFormProps<string>) {
  return <BaseRadioButtonController {...props} />;
}

export default connectToForm<string>({
  initialValue: '',
  parse: toString,
})(FormRadioButtonController);
