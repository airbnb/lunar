import React from 'react';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import DirectionalIcon from '.';

export default {
  title: 'Core/DirectionalIcon',
  parameters: {
    inspectComponents: [DirectionalIcon],
  },
};

export function rendersLeftAndRightIconsBasedOnRtlSetting() {
  return (
    <div>
      Toggle RTL mode to view the icon orientation flip.
      <br />
      <br />
      <DirectionalIcon
        decorative
        direction="left"
        left={IconChevronLeft}
        right={IconChevronRight}
        size="1.5em"
      />
      <DirectionalIcon
        decorative
        direction="right"
        left={IconChevronLeft}
        right={IconChevronRight}
        size="3em"
      />
    </div>
  );
}

rendersLeftAndRightIconsBasedOnRtlSetting.story = {
  name: 'Renders left and right icons based on RTL setting.',
};
