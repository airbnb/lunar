import React from 'react';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Button from '.';

export default {
  title: 'Core/Button',
  parameters: {
    inspectComponents: [Button],
  },
};

export function standardButtonWithAnInvertedVariant() {
  return (
    <>
      <Button>Button</Button> <Button inverted>Button</Button>
    </>
  );
}

standardButtonWithAnInvertedVariant.story = {
  name: 'Standard button with an inverted variant.',
};

export function renderAnAnchorLinkWhenPassingHref() {
  return (
    <>
      <Button openInNewWindow href="https://github.com/airbnb/lunar">
        Link
      </Button>{' '}
      <Button openInNewWindow inverted href="https://github.com/airbnb/lunar">
        Link
      </Button>
    </>
  );
}

renderAnAnchorLinkWhenPassingHref.story = {
  name: 'Render an anchor link when passing `href`.',
};

export function withEventHandlers() {
  return (
    <Button
      onClick={action('onClick')}
      onMouseOver={action('onMouseOver')}
      onFocus={action('onFocus')}
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
      <Button small>Button</Button> <Button>Button</Button> <Button large>Button</Button>
      <br />
      <br />
      <Button inverted small>
        Button
      </Button>{' '}
      <Button inverted>Button</Button>{' '}
      <Button inverted large>
        Button
      </Button>
    </>
  );
}

withDifferentSizingSmallRegularDefaultAndLarge.story = {
  name: 'With different sizing: small, regular (default), and large.',
};

export function withDifferentStatesDisabledAndLoading() {
  return (
    <>
      <Button disabled>Button</Button> <Button loading>Button</Button>
      <br />
      <br />
      <Button inverted disabled>
        Button
      </Button>{' '}
      <Button inverted loading>
        Button
      </Button>
    </>
  );
}

withDifferentStatesDisabledAndLoading.story = {
  name: 'With different states: disabled and loading.',
};

export function withBeforeAndOrAfterIcons() {
  return (
    <div>
      <Button beforeIcon={<IconAddAlt decorative />}>Before icon</Button>{' '}
      <Button afterIcon={<IconAddAlt decorative />}>After icon</Button>
    </div>
  );
}

withBeforeAndOrAfterIcons.story = {
  name: 'With before and or after icons.',
};

export function withBorderless() {
  return (
    <div>
      <Button borderless>Button</Button>{' '}
      <Button borderless inverted>
        Button
      </Button>{' '}
      <Button borderless disabled>
        Button
      </Button>
    </div>
  );
}

withBorderless.story = {
  name: 'With borderless.',
};
