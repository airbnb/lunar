import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from './Button';
import Copy from './Copy';

storiesOf('Core/Copy', module)
  .add('Copy a string of text to the clipboard.', () => (
    <Copy text="This string has been copied." />
  ))
  .add('With a custom prompt message.', () => (
    <Copy text="This string has been copied." prompt="Yo copy me..." />
  ))
  .add('With a custom element to trigger the copy.', () => (
    <Copy text="This string has been copied.">
      <Button>Copy me!</Button>
    </Copy>
  ));
