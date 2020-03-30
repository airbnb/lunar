import React from 'react';
import Button from '../Button';
import Input from '../Input';
import TextArea from '../TextArea';
import FocusTrap from '.';

export default {
  title: 'Core/FocusTrap',
  parameters: {
    inspectComponents: [FocusTrap],
  },
};

export function trapsFocusTryTabbingAround() {
  return (
    <FocusTrap>
      <Input name="trap-input" label="Input" onChange={() => console.log('onChange')} />

      <TextArea name="trap-textarea" label="Textarea" onChange={() => console.log('onChange')} />

      <Button>Action</Button>
    </FocusTrap>
  );
}

trapsFocusTryTabbingAround.story = {
  name: 'Traps focus (try tabbing around).',
};
