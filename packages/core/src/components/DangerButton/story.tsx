import React from 'react';
import DangerButton from '.';
import ButtonGroup from '../ButtonGroup';

export default {
  title: 'Core/DangerButton',
  parameters: {
    inspectComponents: [DangerButton],
  },
};

export function buttonWithAnInvertedVariant() {
  return (
    <ButtonGroup>
      <DangerButton>Button</DangerButton>
      <DangerButton inverted>Button</DangerButton>
    </ButtonGroup>
  );
}

buttonWithAnInvertedVariant.story = {
  name: 'Button with an inverted variant.',
};

export function anAnchorLinkWhenPassingHref() {
  return (
    <ButtonGroup>
      <DangerButton openInNewWindow href="https://github.com/airbnb/lunar">
        Link
      </DangerButton>

      <DangerButton openInNewWindow inverted href="https://github.com/airbnb/lunar">
        Link
      </DangerButton>
    </ButtonGroup>
  );
}

anAnchorLinkWhenPassingHref.story = {
  name: 'An anchor link when passing `href`.',
};

export function withEventHandlers() {
  return (
    <DangerButton
      onClick={() => console.log('onClick')}
      onMouseOver={() => console.log('onMouseOver')}
      onFocus={() => console.log('onFocus')}
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
      <ButtonGroup>
        <DangerButton small>Button</DangerButton>
        <DangerButton>Button</DangerButton>
        <DangerButton large>Button</DangerButton>
      </ButtonGroup>

      <br />

      <ButtonGroup>
        <DangerButton inverted small>
          Button
        </DangerButton>

        <DangerButton inverted>Button</DangerButton>

        <DangerButton inverted large>
          Button
        </DangerButton>
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
        <DangerButton disabled>Button</DangerButton>
        <DangerButton loading>Button</DangerButton>
      </ButtonGroup>

      <br />

      <ButtonGroup>
        <DangerButton inverted disabled>
          Button
        </DangerButton>

        <DangerButton inverted loading>
          Button
        </DangerButton>
      </ButtonGroup>
    </>
  );
}

withDifferentStatesDisabledAndLoading.story = {
  name: 'With different states: disabled and loading.',
};
