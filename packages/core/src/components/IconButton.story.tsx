import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconCheck from '@airbnb/lunar-icons/lib/interface/IconCheck';
import IconButton from './IconButton';

storiesOf('Core/IconButton', module)
  .add('A standard button, with different sizes.', () => (
    <>
      <IconButton onClick={action('onClick')}>
        <IconCheck />
      </IconButton>
      <br />
      <br />
      <IconButton onClick={action('onClick')}>
        <IconCheck size="2em" />
      </IconButton>
    </>
  ))
  .add('An anchor link when passing `href`.', () => (
    <IconButton onClick={action('onClick')} href="https://github.com/airbnb/lunar" openInNewWindow>
      <IconCheck />
    </IconButton>
  ))
  .add('Wrapped in a tooltip.', () => (
    <IconButton onClick={action('onClick')} tooltip="This does something cool.">
      <IconCheck />
    </IconButton>
  ))
  .add('With a disabled state.', () => (
    <IconButton onClick={action('onClick')} disabled>
      <IconCheck />
    </IconButton>
  ));
