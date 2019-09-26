import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import SecondaryLink from './SecondaryLink';

storiesOf('Core/SecondaryLink', module)
  .addParameters({
    inspectComponents: [SecondaryLink],
  })
  .add('A secondary link.', () => (
    <SecondaryLink href="https://github.com/airbnb/lunar">Link</SecondaryLink>
  ))
  .add('A button link.', () => <SecondaryLink>Link</SecondaryLink>)
  .add('With different sizing: small, regular (default), and large.', () => (
    <>
      <SecondaryLink small href="https://github.com/airbnb/lunar">
        Link
      </SecondaryLink>{' '}
      <SecondaryLink href="https://github.com/airbnb/lunar">Link</SecondaryLink>{' '}
      <SecondaryLink large href="https://github.com/airbnb/lunar">
        Link
      </SecondaryLink>
    </>
  ))
  .add('With different states: muted, disabled, and inverted.', () => (
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
    <SecondaryLink disabled href="https://github.com/airbnb/lunar" onClick={action('onClick')}>
      Link
    </SecondaryLink>
  ))
  .add('Bold text.', () => (
    <SecondaryLink bold href="https://github.com/airbnb/lunar">
      Link
    </SecondaryLink>
  ));
