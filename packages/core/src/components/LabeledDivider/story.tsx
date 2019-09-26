import React from 'react';
import { storiesOf } from '@storybook/react';
import LabeledDivider from '.';

storiesOf('Core/LabeledDivider', module)
  .addParameters({
    inspectComponents: [LabeledDivider],
  })
  .add('Standard divider with label.', () => <LabeledDivider label="Custom label" />);
