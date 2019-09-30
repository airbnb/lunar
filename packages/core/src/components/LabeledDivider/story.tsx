import React from 'react';
import LabeledDivider from '.';

export default {
  title: 'Core/LabeledDivider',
  parameters: {
    inspectComponents: [LabeledDivider],
  },
};

export function standardDividerWithLabel() {
  return <LabeledDivider label="Custom label" />;
}

standardDividerWithLabel.story = {
  name: 'Standard divider with label.',
};
