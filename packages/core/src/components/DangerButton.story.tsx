import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DangerButton from './DangerButton';

storiesOf('Core/DangerButton', module)
  .add('Button with an inverted variant.', () => (
    <>
      <DangerButton>Button</DangerButton> <DangerButton inverted>Button</DangerButton>
    </>
  ))
  .add('An anchor link when passing `href`.', () => (
    <>
      <DangerButton href="https://github.com/airbnb/lunar" openInNewWindow>
        Link
      </DangerButton>{' '}
      <DangerButton href="https://github.com/airbnb/lunar" openInNewWindow inverted>
        Link
      </DangerButton>
    </>
  ))
  .add('With event handlers.', () => (
    <DangerButton
      onClick={action('onClick')}
      onMouseOver={action('onMouseOver')}
      onFocus={action('onFocus')}
    >
      Button
    </DangerButton>
  ))
  .add('With different sizing: small, regular (default), and large.', () => (
    <>
      <DangerButton small>Button</DangerButton> <DangerButton>Button</DangerButton>{' '}
      <DangerButton large>Button</DangerButton>
      <br />
      <br />
      <DangerButton inverted small>
        Button
      </DangerButton>{' '}
      <DangerButton inverted>Button</DangerButton>{' '}
      <DangerButton inverted large>
        Button
      </DangerButton>
    </>
  ))
  .add('With different states: disabled and loading.', () => (
    <>
      <DangerButton disabled>Button</DangerButton> <DangerButton loading>Button</DangerButton>
      <br />
      <br />
      <DangerButton inverted disabled>
        Button
      </DangerButton>{' '}
      <DangerButton inverted loading>
        Button
      </DangerButton>
    </>
  ));
