import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import StatusText from '.';

export default {
  title: 'Core/StatusText',
  parameters: {
    inspectComponents: [StatusText],
  },
};

export function defaultAndStatusClassifiedText() {
  return (
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
  );
}

defaultAndStatusClassifiedText.story = {
  name: 'Default and status classified text.',
};

export function canPassPropsToTheUnderlyingComponent() {
  return (
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
  );
}

canPassPropsToTheUnderlyingComponent.story = {
  name: 'Can pass props to the underlying component.',
};
