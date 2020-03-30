import React from 'react';
import IconCalendar from '@airbnb/lunar-icons/lib/general/IconCalendar';
import IconUser from '@airbnb/lunar-icons/lib/general/IconUser';
import IconCloseAlt from '@airbnb/lunar-icons/lib/interface/IconCloseAlt';
import IconSettings from '@airbnb/lunar-icons/lib/interface/IconSettings';
import lunar from ':storybook/images/lunar-logo.png';
import Spacing from '../Spacing';
import Chip from '.';
import ButtonGroup from '../ButtonGroup';
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

      <ButtonGroup>
        <Chip afterIcon={<IconCloseAlt decorative size="2em" />}>Chip</Chip>

        <Chip beforeIcon={<IconCalendar decorative size="1.2em" />}>Calendar</Chip>

        <Chip
          afterIcon={<IconCalendar decorative size="1.2em" />}
          beforeIcon={<IconCalendar decorative size="1.2em" />}
        >
          Calendar
        </Chip>
      </ButtonGroup>
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

      <ButtonGroup>
        <Chip
          compact
          beforeIcon={<IconUser decorative size="1.2em" />}
          onClick={() => console.log('onClick')}
        >
          Chip
        </Chip>

        <Chip
          compact
          afterIcon={<IconCalendar decorative size="1.2em" />}
          onClick={() => console.log('onClick')}
        >
          Chip
        </Chip>

        <Chip compact active onClick={() => console.log('onClick')}>
          Chip
        </Chip>
      </ButtonGroup>
    </>
  );
}

compactChip.story = {
  name: 'Compact chip.',
};

export function withAnIconButton() {
  return (
    <ButtonGroup>
      <Chip
        afterIcon={<IconCloseAlt decorative size="2em" />}
        onIconClick={() => console.log('onIconClick')}
      >
        Close
      </Chip>

      <Chip
        disabled
        afterIcon={<IconCloseAlt decorative size="2em" />}
        onIconClick={() => console.log('onIconClick')}
      >
        Close
      </Chip>
    </ButtonGroup>
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
    <ButtonGroup>
      <Chip disabled>Chip</Chip>

      <Chip disabled afterIcon={<IconSettings decorative size="2em" />} profileImageSrc={lunar}>
        User
      </Chip>

      <Chip disabled afterIcon={<IconSettings decorative size="2em" />}>
        Settings
      </Chip>
    </ButtonGroup>
  );
}

disabledChips.story = {
  name: 'Disabled chips.',
};

export function asButtons() {
  return (
    <ButtonGroup>
      <Chip onClick={() => console.log('onClick')}>Chip</Chip>

      <Chip
        afterIcon={<IconSettings decorative size="2em" />}
        profileImageSrc={lunar}
        onClick={() => console.log('onClick')}
      >
        User
      </Chip>

      <Chip
        afterIcon={<IconSettings decorative size="2em" />}
        onClick={() => console.log('onClick')}
      >
        Settings
      </Chip>
    </ButtonGroup>
  );
}

asButtons.story = {
  name: 'As buttons.',
};
