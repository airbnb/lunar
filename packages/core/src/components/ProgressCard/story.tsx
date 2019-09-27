import React from 'react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import ProgressBar from '../ProgressBar';
import Text from '../Text';
import SteppedProgressBar, { Step } from '../SteppedProgressBar';
import ProgressCard from '.';

export default {
  title: 'Core/ProgressCard',
  parameters: {
    inspectComponents: [ProgressCard],
  },
};

export function aCardWithAProgressBar() {
  return <ProgressCard title="Upload progress" progress={<ProgressBar percent={66} />} />;
}

aCardWithAProgressBar.story = {
  name: 'A card with a progress bar.',
};

export function withChildrenAndASteppedProgressBar() {
  return (
    <ProgressCard
      title="Upload progress"
      progress={
        <SteppedProgressBar>
          <Step complete />
          <Step />
          <Step />
        </SteppedProgressBar>
      }
    >
      <Text>
        <LoremIpsum />
      </Text>
    </ProgressCard>
  );
}

withChildrenAndASteppedProgressBar.story = {
  name: 'With children and a stepped progress bar.',
};
