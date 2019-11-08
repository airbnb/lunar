import React from 'react';
import Link, { Props } from '../Link';
import styleSheet from './styles';

/** A button to use for secondary actions. Supports all the same props as `Link`. */
export default function SecondaryLink({ children, ...props }: Props) {
  return (
    <Link {...props} styleSheet={styleSheet}>
      {children}
    </Link>
  );
}
