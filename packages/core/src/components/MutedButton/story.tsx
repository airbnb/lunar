import React from 'react';
import MutedButton from '.';
import ButtonGroup from '../ButtonGroup';

export default {
  title: 'Core/MutedButton',
  parameters: {
    inspectComponents: [MutedButton],
  },
};

export function aMutedButtonWithAnInvertedVariant() {
  return (
    <ButtonGroup>
      <MutedButton>Button</MutedButton>
      <MutedButton inverted>Button</MutedButton>
    </ButtonGroup>
  );
}

aMutedButtonWithAnInvertedVariant.story = {
  name: 'A muted button with an inverted variant.',
};

export function anAnchorLinkWhenPassingHref() {
  return (
    <ButtonGroup>
      <MutedButton openInNewWindow href="https://github.com/airbnb/lunar">
        Link
      </MutedButton>

      <MutedButton openInNewWindow inverted href="https://github.com/airbnb/lunar">
        Link
      </MutedButton>
    </ButtonGroup>
  );
}

anAnchorLinkWhenPassingHref.story = {
  name: 'An anchor link when passing `href`.',
};

export function withEventHandlers() {
  return (
    <MutedButton
      onClick={() => console.log('onClick')}
      onMouseOver={() => console.log('onMouseOver')}
      onFocus={() => console.log('onFocus')}
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
      <ButtonGroup>
        <MutedButton small>Button</MutedButton>
        <MutedButton>Button</MutedButton>
        <MutedButton large>Button</MutedButton>
      </ButtonGroup>

      <br />

      <ButtonGroup>
        <MutedButton inverted small>
          Button
        </MutedButton>

        <MutedButton inverted>Button</MutedButton>

        <MutedButton inverted large>
          Button
        </MutedButton>
      </ButtonGroup>
    </>
  );
}

withDifferentSizingSmallRegularDefaultAndLarge.story = {
  name: 'With different sizing: small, regular (default), and large.',
};

export function withDifferentStatesDisabledAndLoading() {
  return (
    <>
      <ButtonGroup>
        <MutedButton disabled>Button</MutedButton>
        <MutedButton loading>Button</MutedButton>
      </ButtonGroup>

      <br />

      <ButtonGroup>
        <MutedButton inverted disabled>
          Button
        </MutedButton>

        <MutedButton inverted loading>
          Button
        </MutedButton>
      </ButtonGroup>
    </>
  );
}

withDifferentStatesDisabledAndLoading.story = {
  name: 'With different states: disabled and loading.',
};
