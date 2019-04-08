import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import MutedButton from './MutedButton';

storiesOf('Core/MutedButton', module)
  .add('A muted button with an inverted variant.', () => (
    <>
      <MutedButton>Button</MutedButton> <MutedButton inverted>Button</MutedButton>
    </>
  ))
  .add('An anchor link when passing `href`.', () => (
    <>
      <MutedButton href="https://github.com/airbnb/lunar" openInNewWindow>
        Link
      </MutedButton>{' '}
      <MutedButton href="https://github.com/airbnb/lunar" openInNewWindow inverted>
        Link
      </MutedButton>
    </>
  ))
  .add('With event handlers.', () => (
    <MutedButton
      onClick={action('onClick')}
      onMouseOver={action('onMouseOver')}
      onFocus={action('onFocus')}
    >
      Button
    </MutedButton>
  ))
  .add('With different sizing: small, regular (default), and large.', () => (
    <>
      <MutedButton small>Button</MutedButton> <MutedButton>Button</MutedButton>{' '}
      <MutedButton large>Button</MutedButton>
      <br />
      <br />
      <MutedButton inverted small>
        Button
      </MutedButton>{' '}
      <MutedButton inverted>Button</MutedButton>{' '}
      <MutedButton inverted large>
        Button
      </MutedButton>
    </>
  ))
  .add('With different states: disabled and loading.', () => (
    <>
      <MutedButton disabled>Button</MutedButton> <MutedButton loading>Button</MutedButton>
      <br />
      <br />
      <MutedButton inverted disabled>
        Button
      </MutedButton>{' '}
      <MutedButton inverted loading>
        Button
      </MutedButton>
    </>
  ));
