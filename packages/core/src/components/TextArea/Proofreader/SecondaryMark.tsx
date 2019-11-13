import React from 'react';
import Mark, { Props } from './Mark';
import { styleSheetSecondryMark as styleSheet } from './styles';

const StyledSecondaryMark = Mark.extendStyles(styleSheet);

/** A mark to use for secondary actions. Supports all the same props as `Mark`. */
export default function SecondaryMark({ children, ...props }: Props) {
  return <StyledSecondaryMark {...props}>{children}</StyledSecondaryMark>;
}
