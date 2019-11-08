import React from 'react';
import Button, { Props } from '../Button';
import styleSheet from './styles';

/** A danger button to use for primary actions. Supports all the same props as `Button`. */
export default function DangerButton({ children, ...props }: Props) {
  return (
    <Button {...props} styleSheet={styleSheet}>
      {children}
    </Button>
  );
}
