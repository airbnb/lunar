import React from 'react';
import { childrenOfType } from 'airbnb-prop-types';
import Card, { Content } from '../Card';
import Text from '../Text';
import ProgressBar from '../ProgressBar';
import SteppedProgressBar from '../SteppedProgressBar';
import Spacing from '../Spacing';

export type ProgressCardProps = {
  /** Content to display below the title. */
  children?: React.ReactNode;
  /** Progress bar to render. */
  progress: NonNullable<React.ReactNode>;
  /** Title of the card. */
  title: NonNullable<React.ReactNode>;
};

/** A card representing the state of progress. */
function ProgressCard({ children, progress, title }: ProgressCardProps) {
  return (
    <Card>
      <Content>
        <Text large bold>
          {title}
        </Text>

        {children && <Spacing top={1}>{children}</Spacing>}

        <Spacing top={1.5}>{progress}</Spacing>
      </Content>
    </Card>
  );
}

ProgressCard.propTypes = {
  progress: childrenOfType(ProgressBar, SteppedProgressBar).isRequired,
};

export default ProgressCard;
