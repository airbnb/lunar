import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import lunar from ':image/lunar-logo.png';
import Spacing from './Spacing';
import Chip from './Chip';

storiesOf('Core/Chip', module)
  .add('Simple chip.', () => <Chip>Chip</Chip>)
  .add('With an icon.', () => <Chip icon={<IconCloseAlt size="2em" />}>Chip</Chip>)
  .add('With an icon button.', () => (
    <>
      <Spacing right={1} inline>
        <Chip icon={<IconCloseAlt size="2em" />} onIconClick={action('onIconClick')}>
          Close
        </Chip>
      </Spacing>

      <Spacing right={0} inline>
        <Chip disabled icon={<IconCloseAlt size="2em" />} onIconClick={action('onIconClick')}>
          Close
        </Chip>
      </Spacing>
    </>
  ))
  .add('With a profile photo.', () => <Chip profileImageSrc={lunar}>User</Chip>)
  .add('With both a profile photo and an icon.', () => (
    <Chip icon={<IconSettings size="2em" />} profileImageSrc={lunar}>
      Settings
    </Chip>
  ))
  .add('Disabled chips.', () => (
    <>
      <Spacing right={1} inline>
        <Chip disabled>Chip</Chip>
      </Spacing>

      <Spacing right={1} inline>
        <Chip disabled icon={<IconSettings size="2em" />} profileImageSrc={lunar}>
          User
        </Chip>
      </Spacing>

      <Spacing right={0} inline>
        <Chip disabled icon={<IconSettings size="2em" />}>
          Settings
        </Chip>
      </Spacing>
    </>
  ))
  .add('As buttons.', () => (
    <>
      <Spacing right={1} inline>
        <Chip onClick={action('onClick')}>Chip</Chip>
      </Spacing>

      <Spacing right={1} inline>
        <Chip
          icon={<IconSettings size="2em" />}
          profileImageSrc={lunar}
          onClick={action('onClick')}
        >
          User
        </Chip>
      </Spacing>

      <Spacing right={0} inline>
        <Chip icon={<IconSettings size="2em" />} onClick={action('onClick')}>
          Settings
        </Chip>
      </Spacing>
    </>
  ));
