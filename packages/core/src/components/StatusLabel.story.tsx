import React from 'react';
import { storiesOf } from '@storybook/react';
import IconAddAlt from '@airbnb/lunar-icons/lib/interface/IconAddAlt';
import Text from './Text';
import StatusLabel from './StatusLabel';

storiesOf('Core/StatusLabel', module)
  .add('Default and status labels.', () => (
    <>
      <StatusLabel>Default</StatusLabel>
      <StatusLabel notice>Notice</StatusLabel>
      <StatusLabel info>Info</StatusLabel>
      <StatusLabel success>Success</StatusLabel>
      <StatusLabel warning>Warning</StatusLabel>
      <StatusLabel danger>Danger</StatusLabel>
      <StatusLabel muted>Muted</StatusLabel>
    </>
  ))
  .add('Branded status labels.', () => (
    <>
      <StatusLabel luxury>Luxury</StatusLabel>
      <StatusLabel plus>Plus</StatusLabel>
    </>
  ))
  .add('Color inverted and uppercased labels.', () => (
    <>
      <StatusLabel inverted uppercased>
        Default
      </StatusLabel>
      <StatusLabel inverted uppercased notice>
        Notice
      </StatusLabel>
      <StatusLabel inverted uppercased info>
        Info
      </StatusLabel>
      <StatusLabel inverted uppercased success>
        Success
      </StatusLabel>
      <StatusLabel inverted uppercased warning>
        Warning
      </StatusLabel>
      <StatusLabel inverted uppercased danger>
        Danger
      </StatusLabel>
      <StatusLabel inverted uppercased muted>
        Muted
      </StatusLabel>
      <StatusLabel inverted uppercased luxury>
        Luxury
      </StatusLabel>
      <StatusLabel inverted uppercased plus>
        Plus
      </StatusLabel>
    </>
  ))
  .add('With a border applied.', () => (
    <StatusLabel inverted bordered>
      Default
    </StatusLabel>
  ))
  .add('Within a block of text.', () => (
    <Text>
      Lorem ipsum dolor sit amet. <StatusLabel>Default</StatusLabel> Consectetur adipiscing elit.
    </Text>
  ))
  .add('With before and or after icons.', () => (
    <>
      <div>
        <StatusLabel beforeIcon={<IconAddAlt decorative />} success>
          Before icon
        </StatusLabel>
        <StatusLabel afterIcon={<IconAddAlt decorative />} notice>
          After icon
        </StatusLabel>
      </div>
    </>
  ));
