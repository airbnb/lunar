import React from 'react';
import { action } from '@storybook/addon-actions';
import DangerButton from '.';

export default {
  title: 'Core/DangerButton',
  parameters: {
    inspectComponents: [DangerButton],
  },
};

export function buttonWithAnInvertedVariant() {
  return (
    <>
      <DangerButton>Button</DangerButton> <DangerButton inverted>Button</DangerButton>
    </>
  );
}

buttonWithAnInvertedVariant.story = {
  name: 'Button with an inverted variant.',
};

export function anAnchorLinkWhenPassingHref() {
  return (
    <>
      <DangerButton openInNewWindow href="https://github.com/airbnb/lunar">
        Link
      </DangerButton>{' '}
      <DangerButton openInNewWindow inverted href="https://github.com/airbnb/lunar">
        Link
      </DangerButton>
    </>
  );
}

anAnchorLinkWhenPassingHref.story = {
  name: 'An anchor link when passing `href`.',
};

export function withEventHandlers() {
  return (
    <DangerButton
      onClick={action('onClick')}
      onMouseOver={action('onMouseOver')}
      onFocus={action('onFocus')}
    >
      Button
    </DangerButton>
  );
}

withEventHandlers.story = {
  name: 'With event handlers.',
};

export function withDifferentSizingSmallRegularDefaultAndLarge() {
  return (
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
  );
}

withDifferentSizingSmallRegularDefaultAndLarge.story = {
  name: 'With different sizing: small, regular (default), and large.',
};

export function withDifferentStatesDisabledAndLoading() {
  return (
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
  );
}

withDifferentStatesDisabledAndLoading.story = {
  name: 'With different states: disabled and loading.',
};
