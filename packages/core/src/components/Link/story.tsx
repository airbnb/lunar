/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { action } from '@storybook/addon-actions';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Link from '.';

export default {
  title: 'Core/Link',
  parameters: {
    inspectComponents: [Link],
  },
};

export function aStandardLink() {
  return <Link href="https://github.com/airbnb/lunar">Link</Link>;
}

aStandardLink.story = {
  name: 'A standard link.',
};

export function aButtonLink() {
  return <Link onClick={action('onClick')}>Button</Link>;
}

aButtonLink.story = {
  name: 'A button link.',
};

export function withDifferentSizingSmallRegularDefaultAndLarge() {
  return (
    <>
      <Link small href="https://github.com/airbnb/lunar">
        Link
      </Link>{' '}
      <Link href="https://github.com/airbnb/lunar">Link</Link>{' '}
      <Link large href="https://github.com/airbnb/lunar">
        Link
      </Link>
    </>
  );
}

withDifferentSizingSmallRegularDefaultAndLarge.story = {
  name: 'With different sizing: small, regular (default), and large.',
};

export function withDifferentStatesMutedDisabledAndInverted() {
  return (
    <>
      <Link muted href="https://github.com/airbnb/lunar">
        Link
      </Link>{' '}
      <Link disabled href="https://github.com/airbnb/lunar">
        Link
      </Link>{' '}
      <Link inverted href="https://github.com/airbnb/lunar">
        Link
      </Link>
    </>
  );
}

withDifferentStatesMutedDisabledAndInverted.story = {
  name: 'With different states: muted, disabled, and inverted.',
};

export function withBeforeAndOrAfterIcons() {
  return (
    <>
      <div>
        <Link href="https://github.com/airbnb/lunar" beforeIcon={<IconAddAlt decorative />}>
          Link
        </Link>
        <br />
        <Link href="https://github.com/airbnb/lunar" afterIcon={<IconAddAlt decorative />}>
          Link
        </Link>
      </div>
    </>
  );
}

withBeforeAndOrAfterIcons.story = {
  name: 'With before and or after icons.',
};

export function stopClickAndDefaultEventsWhenDisabled() {
  return (
    <Link disabled href="https://github.com/airbnb/lunar" onClick={action('onClick')}>
      Link
    </Link>
  );
}

stopClickAndDefaultEventsWhenDisabled.story = {
  name: 'Stop click and default events when disabled.',
};

export function boldText() {
  return (
    <>
      <Link bold href="https://github.com/airbnb/lunar">
        Link
      </Link>
      <br />
      <Link bold onClick={action('onClick')}>
        Button
      </Link>
    </>
  );
}

boldText.story = {
  name: 'Bold text.',
};
