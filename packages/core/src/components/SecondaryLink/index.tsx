import React from 'react';
import aesthetic from 'aesthetic';
import Link, { LinkProps } from '../Link';
import { linkStyleSheet } from '../Link/styles';

const styleSheet = aesthetic.extendStyles(linkStyleSheet, ({ color }) => ({
  link: {
    color: color.core.neutral[5],

    ':hover': {
      color: color.core.neutral[6],
    },

    ':focus': {
      color: color.core.neutral[6],
    },
  },
}));

/** A link to use for secondary actions. Supports all the same props as `Link`. */
export default function SecondaryLink({ children, ...props }: LinkProps) {
  return (
    <Link {...props} styleSheet={styleSheet}>
      {children}
    </Link>
  );
}
