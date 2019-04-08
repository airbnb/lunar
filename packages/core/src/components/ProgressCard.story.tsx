import React from 'react';
import { storiesOf } from '@storybook/react';
import LoremIpsum from ':storybook/components/LoremIpsum';
import ProgressBar from './ProgressBar';
import Text from './Text';
import SteppedProgressBar, { Step } from './SteppedProgressBar';
import ProgressCard from './ProgressCard';

storiesOf('Core/ProgressCard', module)
  .add('A card with a progress bar.', () => (
    <ProgressCard title="Upload progress" progress={<ProgressBar percent={66} />} />
  ))
  .add('With children and a stepped progress bar.', () => (
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
  ));
