import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import Title from '.';

export default {
  title: 'Core/Title',
  parameters: {
    inspectComponents: [Title],
  },
};

export function titlesWithDifferentHeadingLevels() {
  return (
    <>
      <Title level={1}>
        <LoremIpsum short />
      </Title>

      <Title level={2}>
        <LoremIpsum short />
      </Title>

      <Title level={3}>
        <LoremIpsum short />
      </Title>
    </>
  );
}

titlesWithDifferentHeadingLevels.story = {
  name: 'Titles with different heading levels.',
};

export function withDifferentStatesMutedInvertedAndPrimary() {
  return (
    <>
      <Title muted level={3}>
        <LoremIpsum short />
      </Title>

      <Title inverted level={3}>
        <LoremIpsum short />
      </Title>

      <Title primary level={3}>
        <LoremIpsum short />
      </Title>
    </>
  );
}

withDifferentStatesMutedInvertedAndPrimary.story = {
  name: 'With different states: muted, inverted, and primary.',
};

export function withAlignedText() {
  return (
    <>
      <Title level={3}>
        <LoremIpsum short />
      </Title>

      <Title centerAlign level={3}>
        <LoremIpsum short />
      </Title>

      <Title endAlign level={3}>
        <LoremIpsum short />
      </Title>
    </>
  );
}

withAlignedText.story = {
  name: 'With aligned text.',
};
