import React from 'react';
import MutedButton from '.';

export default {
  title: 'Core/MutedButton',
  parameters: {
    inspectComponents: [MutedButton],
  },
};

export function aMutedButtonWithAnInvertedVariant() {
  return (
    <>
      <MutedButton>Button</MutedButton> <MutedButton inverted>Button</MutedButton>
    </>
  );
}

aMutedButtonWithAnInvertedVariant.story = {
  name: 'A muted button with an inverted variant.',
};

export function anAnchorLinkWhenPassingHref() {
  return (
    <>
      <MutedButton openInNewWindow href="https://github.com/airbnb/lunar">
        Link
      </MutedButton>{' '}
      <MutedButton openInNewWindow inverted href="https://github.com/airbnb/lunar">
        Link
      </MutedButton>
    </>
  );
}

anAnchorLinkWhenPassingHref.story = {
  name: 'An anchor link when passing `href`.',
};

export function withEventHandlers() {
  return (
    <MutedButton
      onClick={action('onClick')}
      onMouseOver={action('onMouseOver')}
      onFocus={action('onFocus')}
    >
      Button
    </MutedButton>
  );
}

withEventHandlers.story = {
  name: 'With event handlers.',
};

export function withDifferentSizingSmallRegularDefaultAndLarge() {
  return (
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
  );
}

withDifferentSizingSmallRegularDefaultAndLarge.story = {
  name: 'With different sizing: small, regular (default), and large.',
};

export function withDifferentStatesDisabledAndLoading() {
  return (
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
  );
}

withDifferentStatesDisabledAndLoading.story = {
  name: 'With different states: disabled and loading.',
};
