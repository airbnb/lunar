import React from 'react';
import FieldAffix, { FieldAffixProps } from '../private/FieldAffix';

/** A suffix to display after an input within a form field. */
export default function Suffix({ children, small, large, disabled }: FieldAffixProps) {
  return (
    <FieldAffix after small={small} large={large} disabled={disabled}>
      {children}
    </FieldAffix>
  );
}
