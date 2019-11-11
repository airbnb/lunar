import React from 'react';
import Link, { Props } from '../Link';

const StyledSecondaryLink = Link.extendStyles(({ color }) => ({
  link: {
    color: color.core.neutral[5],

    ':hover': {
      color: color.core.neutral[6],
    },
  },
}));

/** A link to use for secondary actions. Supports all the same props as `Link`. */
export default function SecondaryLink({ children, ...props }: Props) {
  return <StyledSecondaryLink {...props}>{children}</StyledSecondaryLink>;
}
