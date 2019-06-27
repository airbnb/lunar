import React from 'react';
import { storiesOf } from '@storybook/react';
import ExpandableIcon from './ExpandableIcon';

storiesOf('Core/ExpandableIcon', module)
  .addParameters({
    inspectComponents: [ExpandableIcon],
  })
  .add('Renders horizontal arrow when not expanded.', () => (
    <ExpandableIcon expanded={false} size="1.5em" />
  ))
  .add('Renders down arrow, with custom size, when expanded.', () => (
    <ExpandableIcon expanded size="3em" />
  ));
