import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import FocusTrap from './FocusTrap';

storiesOf('Core/FocusTrap', module).add('Traps focus (try tabbing around).', () => (
  <FocusTrap>
    <Input name="trap-input" label="Input" onChange={action('onChange')} />

    <TextArea name="trap-textarea" label="Textarea" onChange={action('onChange')} />

    <Button>Action</Button>
  </FocusTrap>
));
