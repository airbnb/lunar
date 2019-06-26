import React from 'react';
import { storiesOf } from '@storybook/react';
import IconChevronLeft from '@airbnb/lunar-icons/lib/interface/IconChevronLeft';
import IconChevronRight from '@airbnb/lunar-icons/lib/interface/IconChevronRight';
import DirectionalIcon from './DirectionalIcon';

storiesOf('Core/DirectionalIcon', module)
  .addParameters({
    inspectComponents: [DirectionalIcon],
  })
  .add('Renders left and right icons based on RTL setting.', () => (
    <div>
      Toggle RTL mode to view the icon orientation flip.
      <br />
      <br />
      <DirectionalIcon
        direction="left"
        left={IconChevronLeft}
        right={IconChevronRight}
        size="1.5em"
        decorative
      />
      <DirectionalIcon
        direction="right"
        left={IconChevronLeft}
        right={IconChevronRight}
        size="3em"
        decorative
      />
    </div>
  ));
