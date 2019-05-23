import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconCalendar from '@airbnb/lunar-icons/lib/general/IconCalendar';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import lunar from ':storybook/images/lunar-logo.png';
import Spacing from './Spacing';
import Chip from './Chip';

storiesOf('Core/Chip', module)
  .addParameters({
    inspectComponents: [Chip],
  })
  .add('Simple chip.', () => <Chip>Chip</Chip>)
  .add('Compact chip.', () => (
    <>
      <Spacing right={1} inline>
        <Chip compact onClick={action('onClick')}>
          Chip
        </Chip>
      </Spacing>

      <Spacing right={0} inline>
        <Chip compact active onClick={action('onClick')}>
          Chip
        </Chip>
      </Spacing>
    </>
  ))
  .add('With a icons before or after.', () => (
    <>
      <Spacing right={1} inline>
        <Chip icon={<IconCloseAlt size="2em" />}>Chip</Chip>
      </Spacing>

      <Spacing right={0} inline>
        <Chip beforeIcon={<IconCalendar size="1.2em" />}>Calendar</Chip>
      </Spacing>
    </>
  ))
  .add('With an icon button.', () => (
    <>
      <Spacing right={1} inline>
        <Chip icon={<IconCloseAlt decorative size="2em" />} onIconClick={action('onIconClick')}>
          Close
        </Chip>
      </Spacing>

      <Spacing right={0} inline>
        <Chip
          disabled
          icon={<IconCloseAlt decorative size="2em" />}
          onIconClick={action('onIconClick')}
        >
          Close
        </Chip>
      </Spacing>
    </>
  ))
  .add('With a profile photo.', () => <Chip profileImageSrc={lunar}>User</Chip>)
  .add('With both a profile photo and an icon.', () => (
    <Chip icon={<IconSettings decorative size="2em" />} profileImageSrc={lunar}>
      Settings
    </Chip>
  ))
  .add('Disabled chips.', () => (
    <>
      <Spacing right={1} inline>
        <Chip disabled>Chip</Chip>
      </Spacing>

      <Spacing right={1} inline>
        <Chip disabled icon={<IconSettings decorative size="2em" />} profileImageSrc={lunar}>
          User
        </Chip>
      </Spacing>

      <Spacing right={0} inline>
        <Chip disabled icon={<IconSettings decorative size="2em" />}>
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
          icon={<IconSettings decorative size="2em" />}
          profileImageSrc={lunar}
          onClick={action('onClick')}
        >
          User
        </Chip>
      </Spacing>

      <Spacing right={0} inline>
        <Chip icon={<IconSettings decorative size="2em" />} onClick={action('onClick')}>
          Settings
        </Chip>
      </Spacing>
    </>
  ));
