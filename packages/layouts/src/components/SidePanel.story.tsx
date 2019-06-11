import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import IconArrowLeft from '@airbnb/lunar-icons/lib/interface/IconArrowLeft';
import IconArrowRight from '@airbnb/lunar-icons/lib/interface/IconArrowRight';
import IconCaretRight from '@airbnb/lunar-icons/lib/interface/IconCaretRight';
import IconCaretLeft from '@airbnb/lunar-icons/lib/interface/IconCaretLeft';

import SidePanel from './SidePanel';

storiesOf('Layouts/SidePanel', module)
  .addParameters({
    inspectComponents: [SidePanel],
  })
  .add('A side panel.', () => (
    <SidePanel collapsible={false} sidePane={<LoremIpsum />} mainPane={<LoremIpsum />} />
  ))
  .add('A wide side panel.', () => (
    <SidePanel
      fixedWidth={600}
      collapsible={false}
      sidePane={<LoremIpsum />}
      mainPane={<LoremIpsum />}
    />
  ))
  .add('A side panel with dynamic width constrained by a min and max.', () => (
    <SidePanel
      percentWidth={25}
      minWidth={300}
      maxWidth={400}
      collapsible={false}
      sidePane={<LoremIpsum />}
      mainPane={<LoremIpsum />}
    />
  ))
  .add('A collapsible side panel.', () => (
    <SidePanel sidePane={<LoremIpsum />} mainPane={<LoremIpsum />} />
  ))
  .add('A collapsible side panel with custom button offset.', () => (
    <SidePanel sidePane={<LoremIpsum />} mainPane={<LoremIpsum />} buttonTop={435} />
  ))
  .add('A collapsible side panel with custom background color.', () => (
    <SidePanel sidePane={<LoremIpsum />} mainPane={<LoremIpsum />} background="#fafafa" />
  ))
  .add('A right side side panel with custom icons.', () => (
    <SidePanel
      rightSide
      sidePane={<LoremIpsum />}
      mainPane={<LoremIpsum />}
      iconOpen={IconCaretRight}
      iconClosed={IconCaretLeft}
    />
  ))
  .add('A collapsible side panel with a customized button.', () => (
    <SidePanel
      compact={false}
      iconSize="1.3rem"
      iconColor="#008489"
      sidePane={<LoremIpsum />}
      mainPane={<LoremIpsum />}
      iconOpen={IconArrowLeft}
      iconClosed={IconArrowRight}
    />
  ));
