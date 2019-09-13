import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import IconCalendar from '@airbnb/lunar-icons/lib/general/IconCalendar';
import IconUser from '@airbnb/lunar-icons/lib/general/IconUser';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import lunar from ':storybook/images/lunar-logo.png';
import Spacing from './Spacing';
import Chip from './Chip';
import Text from './Text';

storiesOf('Core/Chip', module)
  .addParameters({
    inspectComponents: [Chip],
  })
  .add('Simple chip.', () => <Chip>Chip</Chip>)
  .add('With `active`.', () => <Chip active>Chip</Chip>)
  .add('With a icons before and/or after.', () => (
    <>
      <Spacing bottom={1}>
        <Text>Note that before/after padding is not symetrical</Text>
      </Spacing>
      <Spacing inline right={1}>
        <Chip afterIcon={<IconCloseAlt decorative size="2em" />}>Chip</Chip>
      </Spacing>
      <Spacing inline right={1}>
        <Chip beforeIcon={<IconCalendar decorative size="1.2em" />}>Calendar</Chip>
      </Spacing>
      <Spacing inline right={1}>
        <Chip
          afterIcon={<IconCalendar decorative size="1.2em" />}
          beforeIcon={<IconCalendar decorative size="1.2em" />}
        >
          Calendar
        </Chip>
      </Spacing>
    </>
  ))
  .add('Compact chip.', () => (
    <>
      <Spacing bottom={1}>
        <Text>Note that before/after padding is not symetrical</Text>
      </Spacing>

      <Spacing inline right={1}>
        <Chip compact beforeIcon={<IconUser decorative size="1.2em" />} onClick={action('onClick')}>
          Chip
        </Chip>
      </Spacing>

      <Spacing inline right={1}>
        <Chip
          compact
          afterIcon={<IconCalendar decorative size="1.2em" />}
          onClick={action('onClick')}
        >
          Chip
        </Chip>
      </Spacing>

      <Spacing inline right={0}>
        <Chip compact active onClick={action('onClick')}>
          Chip
        </Chip>
      </Spacing>
    </>
  ))
  .add('With an icon button.', () => (
    <>
      <Spacing inline right={1}>
        <Chip
          afterIcon={<IconCloseAlt decorative size="2em" />}
          onIconClick={action('onIconClick')}
        >
          Close
        </Chip>
      </Spacing>

      <Spacing inline right={0}>
        <Chip
          disabled
          afterIcon={<IconCloseAlt decorative size="2em" />}
          onIconClick={action('onIconClick')}
        >
          Close
        </Chip>
      </Spacing>
    </>
  ))
  .add('With a profile photo.', () => <Chip profileImageSrc={lunar}>User</Chip>)
  .add('With both a profile photo and an icon.', () => (
    <Chip afterIcon={<IconSettings decorative size="2em" />} profileImageSrc={lunar}>
      Settings
    </Chip>
  ))
  .add('Disabled chips.', () => (
    <>
      <Spacing inline right={1}>
        <Chip disabled>Chip</Chip>
      </Spacing>

      <Spacing inline right={1}>
        <Chip disabled afterIcon={<IconSettings decorative size="2em" />} profileImageSrc={lunar}>
          User
        </Chip>
      </Spacing>

      <Spacing inline right={0}>
        <Chip disabled afterIcon={<IconSettings decorative size="2em" />}>
          Settings
        </Chip>
      </Spacing>
    </>
  ))
  .add('As buttons.', () => (
    <>
      <Spacing inline right={1}>
        <Chip onClick={action('onClick')}>Chip</Chip>
      </Spacing>

      <Spacing inline right={1}>
        <Chip
          afterIcon={<IconSettings decorative size="2em" />}
          profileImageSrc={lunar}
          onClick={action('onClick')}
        >
          User
        </Chip>
      </Spacing>

      <Spacing inline right={0}>
        <Chip afterIcon={<IconSettings decorative size="2em" />} onClick={action('onClick')}>
          Settings
        </Chip>
      </Spacing>
    </>
  ));
