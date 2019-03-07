import React from 'react';
import BaseSwitch, { Props } from '@airbnb/lunar/lib/components/Switch';
import connectToForm, { ConnectToFormProps } from '../../composers/connectToForm';
import { toBool } from '../../helpers';

/** `Switch` automatically connected to the parent `Form`.  */
export function FormSwitch(props: Props & ConnectToFormProps) {
  return <BaseSwitch {...props} />;
}

export default connectToForm({
  parse: toBool,
  valueProp: 'checked',
})(FormSwitch);
