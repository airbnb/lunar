import React from 'react';
import Button, { Props } from '../Button';
import styleSheet from './styles';

/** A button to use for secondary actions. Supports all the same props as `Button`. */
export default function MutedButton({ children, ...props }: Props) {
  return (
    <Button {...props} styleSheet={styleSheet}>
      {children}
    </Button>
  );
}
