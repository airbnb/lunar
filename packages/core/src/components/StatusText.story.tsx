import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import StatusText from './StatusText';

storiesOf('Core/StatusText', module)
  .add('Default and status classified text.', () => (
    <>
      <StatusText>
        <LoremIpsum short />
      </StatusText>
      <StatusText notice>
        <LoremIpsum short />
      </StatusText>
      <StatusText info>
        <LoremIpsum short />
      </StatusText>
      <StatusText success>
        <LoremIpsum short />
      </StatusText>
      <StatusText warning>
        <LoremIpsum short />
      </StatusText>
      <StatusText danger>
        <LoremIpsum short />
      </StatusText>
      <StatusText muted>
        <LoremIpsum short />
      </StatusText>
    </>
  ))
  .add('Can pass props to the underlying component.', () => (
    <>
      <StatusText notice micro>
        <LoremIpsum short />
      </StatusText>
      <StatusText info small>
        <LoremIpsum short />
      </StatusText>
      <StatusText success large>
        <LoremIpsum short />
      </StatusText>
      <StatusText warning disabled>
        <LoremIpsum short />
      </StatusText>
      <StatusText danger light>
        <LoremIpsum short />
      </StatusText>
      <StatusText muted bold>
        <LoremIpsum short />
      </StatusText>
    </>
  ));
