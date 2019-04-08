import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import SecondaryLink from './SecondaryLink';

storiesOf('Core/SecondaryLink', module)
  .add('A secondary link.', () => (
    <SecondaryLink href="https://github.com/airbnb/lunar">Link</SecondaryLink>
  ))
  .add('A button link.', () => <SecondaryLink>Link</SecondaryLink>)
  .add('With different sizing: small, regular (default), and large.', () => (
    <>
      <SecondaryLink href="https://github.com/airbnb/lunar" small>
        Link
      </SecondaryLink>{' '}
      <SecondaryLink href="https://github.com/airbnb/lunar">Link</SecondaryLink>{' '}
      <SecondaryLink href="https://github.com/airbnb/lunar" large>
        Link
      </SecondaryLink>
    </>
  ))
  .add('With different states: muted, disabled, and inverted.', () => (
    <>
      <SecondaryLink href="https://github.com/airbnb/lunar" muted>
        Link
      </SecondaryLink>{' '}
      <SecondaryLink href="https://github.com/airbnb/lunar" disabled>
        Link
      </SecondaryLink>{' '}
      <SecondaryLink href="https://github.com/airbnb/lunar" inverted>
        Link
      </SecondaryLink>
    </>
  ))
  .add('With before and or after icons.', () => (
    <>
      <SecondaryLink href="https://github.com/airbnb/lunar" beforeIcon={<IconAddAlt decorative />}>
        Link
      </SecondaryLink>
      <br />
      <SecondaryLink href="https://github.com/airbnb/lunar" afterIcon={<IconAddAlt decorative />}>
        Link
      </SecondaryLink>
    </>
  ))
  .add('Stop click and default events when disabled.', () => (
    <SecondaryLink href="https://github.com/airbnb/lunar" onClick={action('onClick')} disabled>
      Link
    </SecondaryLink>
  ))
  .add('Bold text.', () => (
    <SecondaryLink href="https://github.com/airbnb/lunar" bold>
      Link
    </SecondaryLink>
  ));
