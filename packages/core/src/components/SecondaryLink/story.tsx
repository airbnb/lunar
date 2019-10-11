import React from 'react';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import SecondaryLink from '.';

export default {
  title: 'Core/SecondaryLink',
  parameters: {
    inspectComponents: [SecondaryLink],
  },
};

export function aSecondaryLink() {
  return <SecondaryLink href="https://github.com/airbnb/lunar">Link</SecondaryLink>;
}

aSecondaryLink.story = {
  name: 'A secondary link.',
};

export function aButtonLink() {
  return <SecondaryLink>Link</SecondaryLink>;
}

aButtonLink.story = {
  name: 'A button link.',
};

export function withDifferentSizingSmallRegularDefaultAndLarge() {
  return (
    <>
      <SecondaryLink small href="https://github.com/airbnb/lunar">
        Link
      </SecondaryLink>{' '}
      <SecondaryLink href="https://github.com/airbnb/lunar">Link</SecondaryLink>{' '}
      <SecondaryLink large href="https://github.com/airbnb/lunar">
        Link
      </SecondaryLink>
    </>
  );
}

withDifferentSizingSmallRegularDefaultAndLarge.story = {
  name: 'With different sizing: small, regular (default), and large.',
};

export function withDifferentStatesMutedDisabledAndInverted() {
  return (
    <>
      <SecondaryLink muted href="https://github.com/airbnb/lunar">
        Link
      </SecondaryLink>{' '}
      <SecondaryLink disabled href="https://github.com/airbnb/lunar">
        Link
      </SecondaryLink>{' '}
      <SecondaryLink inverted href="https://github.com/airbnb/lunar">
        Link
      </SecondaryLink>
    </>
  );
}

withDifferentStatesMutedDisabledAndInverted.story = {
  name: 'With different states: muted, disabled, and inverted.',
};

export function withBeforeAndOrAfterIcons() {
  return (
    <>
      <SecondaryLink href="https://github.com/airbnb/lunar" beforeIcon={<IconAddAlt decorative />}>
        Link
      </SecondaryLink>
      <br />
      <SecondaryLink href="https://github.com/airbnb/lunar" afterIcon={<IconAddAlt decorative />}>
        Link
      </SecondaryLink>
    </>
  );
}

withBeforeAndOrAfterIcons.story = {
  name: 'With before and or after icons.',
};

export function stopClickAndDefaultEventsWhenDisabled() {
  return (
    <SecondaryLink disabled href="https://github.com/airbnb/lunar" onClick={action('onClick')}>
      Link
    </SecondaryLink>
  );
}

stopClickAndDefaultEventsWhenDisabled.story = {
  name: 'Stop click and default events when disabled.',
};

export function boldText() {
  return (
    <SecondaryLink bold href="https://github.com/airbnb/lunar">
      Link
    </SecondaryLink>
  );
}

boldText.story = {
  name: 'Bold text.',
};
