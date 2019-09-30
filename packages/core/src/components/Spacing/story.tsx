import React from 'react';
import StatusLabel from '../StatusLabel';
import Spacing from '.';

export default {
  title: 'Core/Spacing',
  parameters: {
    inspectComponents: [Spacing],
  },
};

export function applyTopMargin() {
  return (
    <Spacing top={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  );
}

applyTopMargin.story = {
  name: 'Apply top margin.',
};

export function applyRightMargin() {
  return (
    <Spacing right={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  );
}

applyRightMargin.story = {
  name: 'Apply right margin.',
};

export function applyBottomMargin() {
  return (
    <Spacing bottom={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  );
}

applyBottomMargin.story = {
  name: 'Apply bottom margin.',
};

export function applyLeftMargin() {
  return (
    <Spacing left={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  );
}

applyLeftMargin.story = {
  name: 'Apply left margin.',
};

export function applyTopAndBottomVerticalMargin() {
  return (
    <Spacing vertical={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  );
}

applyTopAndBottomVerticalMargin.story = {
  name: 'Apply top and bottom (vertical) margin.',
};

export function applyLeftAndRightHorizontalMargin() {
  return (
    <Spacing horizontal={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  );
}

applyLeftAndRightHorizontalMargin.story = {
  name: 'Apply left and right (horizontal) margin.',
};

export function applyMarginOnAllSides() {
  return (
    <Spacing all={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  );
}

applyMarginOnAllSides.story = {
  name: 'Apply margin on all sides.',
};

export function usePaddingInsteadOfMargin() {
  return (
    <Spacing inner all={3}>
      <StatusLabel>Content</StatusLabel>
    </Spacing>
  );
}

usePaddingInsteadOfMargin.story = {
  name: 'Use padding instead of margin.',
};

export function displayInline() {
  return (
    <>
      <Spacing inline all={0.5}>
        <StatusLabel>Content 1</StatusLabel>
      </Spacing>
      <Spacing inline all={0.5}>
        <StatusLabel>Content 2</StatusLabel>
      </Spacing>
    </>
  );
}

displayInline.story = {
  name: 'Display inline.',
};
