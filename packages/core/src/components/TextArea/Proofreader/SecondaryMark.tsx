import React from 'react';
import Mark, { Props } from './Mark';

const StyledSecondaryMark = Mark.extendStyles(({ color }) => ({
  mark: {
    '::after': {
      backgroundColor: color.core.warning[2],
    },
  },

  mark_highlight: {
    opacity: 0.75,
    backgroundColor: color.core.warning[2],
  },
}));

/** A mark to use for secondary actions. Supports all the same props as `Mark`. */
export default function SecondaryMark({ children, ...props }: Props) {
  return <StyledSecondaryMark {...props}>{children}</StyledSecondaryMark>;
}
