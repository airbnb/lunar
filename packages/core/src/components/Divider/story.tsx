import React from 'react';
import Divider from '.';

export default {
  title: 'Core/Divider',
  parameters: {
    inspectComponents: [Divider],
  },
};

export function standardDivider() {
  return <Divider />;
}

standardDivider.story = {
  name: 'Standard divider.',
};

export function shortDivider() {
  return <Divider short />;
}

shortDivider.story = {
  name: 'Short divider.',
};
