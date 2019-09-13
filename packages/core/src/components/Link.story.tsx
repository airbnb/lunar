/* eslint-disable jsx-a11y/anchor-is-valid */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Link from './Link';

storiesOf('Core/Link', module)
  .addParameters({
    inspectComponents: [Link],
  })
  .add('A standard link.', () => <Link href="https://github.com/airbnb/lunar">Link</Link>)
  .add('A button link.', () => <Link onClick={action('onClick')}>Button</Link>)
  .add('With different sizing: small, regular (default), and large.', () => (
    <>
      <Link small href="https://github.com/airbnb/lunar">
        Link
      </Link>{' '}
      <Link href="https://github.com/airbnb/lunar">Link</Link>{' '}
      <Link large href="https://github.com/airbnb/lunar">
        Link
      </Link>
    </>
  ))
  .add('With different states: muted, disabled, and inverted.', () => (
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
  ))
  .add('With before and or after icons.', () => (
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
  ))
  .add('Stop click and default events when disabled.', () => (
    <Link disabled href="https://github.com/airbnb/lunar" onClick={action('onClick')}>
      Link
    </Link>
  ))
  .add('Bold text.', () => (
    <>
      <Link bold href="https://github.com/airbnb/lunar">
        Link
      </Link>
      <br />
      <Link bold onClick={action('onClick')}>
        Button
      </Link>
    </>
  ));
