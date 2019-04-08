import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Link from './Link';

storiesOf('Core/Link', module)
  .add('A standard link.', () => <Link href="https://github.com/airbnb/lunar">Link</Link>)
  .add('A button link.', () => <Link onClick={action('onClick')}>Link</Link>)
  .add('With different sizing: small, regular (default), and large.', () => (
    <>
      <Link href="https://github.com/airbnb/lunar" small>
        Link
      </Link>{' '}
      <Link href="https://github.com/airbnb/lunar">Link</Link>{' '}
      <Link href="https://github.com/airbnb/lunar" large>
        Link
      </Link>
    </>
  ))
  .add('With different states: muted, disabled, and inverted.', () => (
    <>
      <Link href="https://github.com/airbnb/lunar" muted>
        Link
      </Link>{' '}
      <Link href="https://github.com/airbnb/lunar" disabled>
        Link
      </Link>{' '}
      <Link href="https://github.com/airbnb/lunar" inverted>
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
    <Link href="https://github.com/airbnb/lunar" onClick={action('onClick')} disabled>
      Link
    </Link>
  ))
  .add('Bold text.', () => (
    <Link href="https://github.com/airbnb/lunar" bold>
      Link
    </Link>
  ));
