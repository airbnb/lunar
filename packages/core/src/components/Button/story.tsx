import React from 'react';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Button from '.';
import ButtonGroup from '../ButtonGroup';

export default {
  title: 'Core/Button',
  parameters: {
    inspectComponents: [Button],
  },
};

export function standardButtonWithAnInvertedVariant() {
  return (
    <ButtonGroup>
      <Button>Button</Button>
      <Button inverted>Button</Button>
    </ButtonGroup>
  );
}

standardButtonWithAnInvertedVariant.story = {
  name: 'Standard button with an inverted variant.',
};

export function renderAnAnchorLinkWhenPassingHref() {
  return (
    <ButtonGroup>
      <Button openInNewWindow href="https://github.com/airbnb/lunar">
        Link
      </Button>
      <Button openInNewWindow inverted href="https://github.com/airbnb/lunar">
        Link
      </Button>
    </ButtonGroup>
  );
}

renderAnAnchorLinkWhenPassingHref.story = {
  name: 'Render an anchor link when passing `href`.',
};

export function withEventHandlers() {
  return (
    <Button
      onClick={() => console.log('onClick')}
      onMouseOver={() => console.log('onMouseOver')}
      onFocus={() => console.log('onFocus')}
    >
      Button
    </Button>
  );
}

withEventHandlers.story = {
  name: 'With event handlers.',
};

export function withDifferentSizingSmallRegularDefaultAndLarge() {
  return (
    <>
      <ButtonGroup>
        <Button small>Button</Button>
        <Button>Button</Button>
        <Button large>Button</Button>
      </ButtonGroup>

      <br />

      <ButtonGroup>
        <Button inverted small>
          Button
        </Button>
        <Button inverted>Button</Button>
        <Button inverted large>
          Button
        </Button>
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
        <Button disabled>Button</Button>
        <Button loading>Button</Button>
      </ButtonGroup>

      <br />

      <ButtonGroup>
        <Button inverted disabled>
          Button
        </Button>
        <Button inverted loading>
          Button
        </Button>
      </ButtonGroup>
    </>
  );
}

withDifferentStatesDisabledAndLoading.story = {
  name: 'With different states: disabled and loading.',
};

export function withBeforeAndOrAfterIcons() {
  return (
    <ButtonGroup>
      <Button beforeIcon={<IconAddAlt decorative />}>Before icon</Button>
      <Button afterIcon={<IconAddAlt decorative />}>After icon</Button>
    </ButtonGroup>
  );
}

withBeforeAndOrAfterIcons.story = {
  name: 'With before and or after icons.',
};

export function withBorderless() {
  return (
    <ButtonGroup>
      <Button borderless>Button</Button>
      <Button borderless inverted>
        Button
      </Button>
      <Button borderless disabled>
        Button
      </Button>
    </ButtonGroup>
  );
}

withBorderless.story = {
  name: 'With borderless.',
};
