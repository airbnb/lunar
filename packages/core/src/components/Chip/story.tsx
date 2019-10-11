import React from 'react';
import IconCalendar from '@airbnb/lunar-icons/lib/general/IconCalendar';
import IconUser from '@airbnb/lunar-icons/lib/general/IconUser';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import lunar from ':storybook/images/lunar-logo.png';
import Spacing from '../Spacing';
import Chip from '.';
import Text from '../Text';

export default {
  title: 'Core/Chip',
  parameters: {
    inspectComponents: [Chip],
  },
};

export function simpleChip() {
  return <Chip>Chip</Chip>;
}

simpleChip.story = {
  name: 'Simple chip.',
};

export function withActive() {
  return <Chip active>Chip</Chip>;
}

withActive.story = {
  name: 'With `active`.',
};

export function withAIconsBeforeAndOrAfter() {
  return (
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
  );
}

withAIconsBeforeAndOrAfter.story = {
  name: 'With a icons before and/or after.',
};

export function compactChip() {
  return (
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
  );
}

compactChip.story = {
  name: 'Compact chip.',
};

export function withAnIconButton() {
  return (
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
  );
}

withAnIconButton.story = {
  name: 'With an icon button.',
};

export function withAProfilePhoto() {
  return <Chip profileImageSrc={lunar}>User</Chip>;
}

withAProfilePhoto.story = {
  name: 'With a profile photo.',
};

export function withBothAProfilePhotoAndAnIcon() {
  return (
    <Chip afterIcon={<IconSettings decorative size="2em" />} profileImageSrc={lunar}>
      Settings
    </Chip>
  );
}

withBothAProfilePhotoAndAnIcon.story = {
  name: 'With both a profile photo and an icon.',
};

export function disabledChips() {
  return (
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
  );
}

disabledChips.story = {
  name: 'Disabled chips.',
};

export function asButtons() {
  return (
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
  );
}

asButtons.story = {
  name: 'As buttons.',
};
