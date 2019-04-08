import React from 'react';
import { storiesOf } from '@storybook/react';
import StatusLabel from './StatusLabel';
import Spacing from './Spacing';

storiesOf('Core/Spacing', module)
  .add('Apply top margin.', () => (
    <Spacing top={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  ))
  .add('Apply right margin.', () => (
    <Spacing right={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  ))
  .add('Apply bottom margin.', () => (
    <Spacing bottom={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  ))
  .add('Apply left margin.', () => (
    <Spacing left={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  ))
  .add('Apply top and bottom (vertical) margin.', () => (
    <Spacing vertical={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  ))
  .add('Apply left and right (horizontal) margin.', () => (
    <Spacing horizontal={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  ))
  .add('Apply margin on all sides.', () => (
    <Spacing all={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  ))
  .add('Use padding instead of margin.', () => (
    <Spacing all={3} inner>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  ))
  .add('Display inline.', () => (
    <>
      <Spacing all={0.5} inline>
        <StatusLabel>Content 1</StatusLabel>
      </Spacing>
      <Spacing all={0.5} inline>
        <StatusLabel>Content 2</StatusLabel>
      </Spacing>
    </>
  ));
