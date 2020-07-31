/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
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
  return <Link onClick={() => console.log('onClick')}>Button</Link>;
}

aButtonLink.story = {
  name: 'A button link.',
};

export function withDifferentSizingMicroSmallRegularDefaultAndLarge() {
  return (
    <>
      <Link micro href="https://github.com/airbnb/lunar">
        Link
      </Link>{' '}
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

withDifferentSizingMicroSmallRegularDefaultAndLarge.story = {
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
    <div>
      <Link href="https://github.com/airbnb/lunar" beforeIcon={<IconAddAlt decorative />}>
        Link
      </Link>
      <br />
      <Link href="https://github.com/airbnb/lunar" afterIcon={<IconAddAlt decorative />}>
        Link
      </Link>
    </div>
  );
}

withBeforeAndOrAfterIcons.story = {
  name: 'With before and or after icons.',
};

export function stopClickAndDefaultEventsWhenDisabled() {
  return (
    <Link disabled href="https://github.com/airbnb/lunar" onClick={() => console.log('onClick')}>
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
      <Link bold onClick={() => console.log('onClick')}>
        Button
      </Link>
    </>
  );
}

boldText.story = {
  name: 'Bold text.',
};

export function truncatedText() {
  return (
    <Link block truncated>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam leo erat, lacinia nec porttitor
      sed, mollis sed nibh. Nam porta sit amet risus quis interdum. Sed feugiat lorem vitae augue
      blandit, sed mollis mi laoreet. Donec auctor, enim eget tempus auctor, est lorem laoreet nisi,
      a rutrum dolor quam eget mi.
    </Link>
  );
}

truncatedText.story = {
  name: 'Truncated text.',
};
