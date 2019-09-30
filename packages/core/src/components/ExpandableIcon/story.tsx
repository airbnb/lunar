import React from 'react';
import ExpandableIcon from '.';

export default {
  title: 'Core/ExpandableIcon',
  parameters: {
    inspectComponents: [ExpandableIcon],
  },
};

export function rendersHorizontalArrowWhenNotExpanded() {
  return <ExpandableIcon expanded={false} size="1.5em" />;
}

rendersHorizontalArrowWhenNotExpanded.story = {
  name: 'Renders horizontal arrow when not expanded.',
};

export function rendersDownArrowWithCustomSizeWhenExpanded() {
  return <ExpandableIcon expanded size="3em" />;
}

rendersDownArrowWithCustomSizeWhenExpanded.story = {
  name: 'Renders down arrow, with custom size, when expanded.',
};
